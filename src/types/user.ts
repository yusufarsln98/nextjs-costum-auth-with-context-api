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
export type Message = {
  message: string;
};

export type AuthAction = (
  newUser: UserCredentials,
  setErrorAlert: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<Message>>,
) => Promise<void>;

export const AuthContext = React.createContext<{
  user: UserResponse | null;
  login: AuthAction;
  signUp: AuthAction;
  logout: () => void;
}>({
  user: null,
  login: async () => {},
  signUp: async () => {},
  logout: () => {},
});
