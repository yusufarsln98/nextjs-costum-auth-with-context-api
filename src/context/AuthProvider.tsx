// AuthProvider.tsx

import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/types/user';
import { useState } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, login, logout, signUp] = useAuth();
  const [errorAlert, setErrorAlert] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signUp, errorAlert, setErrorAlert }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
