import { useAuth } from '@/hooks/useAuth';
import { AuthContext, Message } from '@/types/user';
import { useState } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, login, logout, signUp] = useAuth();
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Message>({ message: '' });

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
