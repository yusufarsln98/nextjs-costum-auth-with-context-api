'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { UserResponse, AuthAction, Message } from '@/types/user';

export const useAuth = (): [
  user: UserResponse | null,
  login: AuthAction,
  logout: () => void,
  signUp: AuthAction,
] => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const pathname = usePathname();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  });

  // set user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // if user is not logged in, redirect to login page
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser && pathname !== '/login' && pathname !== '/signUp') {
      router.push('/login');
    } else if (
      storedUser &&
      (pathname === '/login' || pathname === '/signUp')
    ) {
      router.push('/');
    }
  }, [user, router, pathname]);

  const login: AuthAction = async (user, setErrorAlert, setErrorMessage) => {
    try {
      const response = await axiosInstance.post('/login', user);
      const userResponse: UserResponse = response.data.user;
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(userResponse);
      router.push('/');
    } catch (error: AxiosError | any) {
      console.log((error as AxiosError)?.response?.data);
      setErrorMessage(error?.response?.data as Message);
      setErrorAlert(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const signUp: AuthAction = async (user, setErrorAlert, setErrorMessage) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, user);
      const userResponse: UserResponse = response.data.user;
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(userResponse);
      router.push('/');
    } catch (error: AxiosError | any) {
      console.error((error as AxiosError)?.response?.data);
      setErrorAlert(true);
      setErrorMessage(error?.response?.data as Message);
    }
  };

  return [user, login, logout, signUp];
};
