'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { UserResponse, AuthAction } from '@/types/user';

export const useAuth = (): [
  user: UserResponse | null,
  login: AuthAction,
  logout: () => void,
  signUp: AuthAction,
] => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

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

  // axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response.status === 401) {
  //       console.log(error.response.data);
  //       localStorage.removeItem('user');
  //       setUser(null);
  //       router.push('/login');
  //     }
  //     return Promise.reject(error);
  //   },
  // );

  useEffect(() => {
    const storedUser = localStorage?.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const login: AuthAction = async (user, setShowAlert) => {
    try {
      const response = await axiosInstance.post('/login', user);
      const userResponse: UserResponse = response.data.user;
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(userResponse);
      setShowAlert(false);
      router.push('/');
    } catch (error: AxiosError | any) {
      console.log((error as AxiosError)?.response?.data);
      setShowAlert(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const signUp: AuthAction = async (user, setShowAlert) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, user);
      const userResponse: UserResponse = response.data.user;
      localStorage.setItem('user', JSON.stringify(userResponse));
      setUser(userResponse);
      router.push('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return [user, login, logout, signUp];
};
