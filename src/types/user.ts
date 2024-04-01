import React from 'react';

export type User = {
  id: number;
  username: string;
  password?: string;
  token?: string;
  role: string;
};

export type UserCredentials = Pick<User, 'username' | 'password'>;
export type UserResponse = Pick<User, 'id' | 'username' | 'role' | 'token'>;

export type AuthAction = (
  newUser: UserCredentials,
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>,
) => Promise<void>;

export const AuthContext = React.createContext<{
  user: UserResponse | null;
  login: AuthAction;
  signUp: AuthAction;
  logout: () => void;
  errorAlert: boolean;
  setErrorAlert: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: null,
  login: async () => {},
  signUp: async () => {},
  logout: () => {},
  errorAlert: false,
  setErrorAlert: () => {},
});
