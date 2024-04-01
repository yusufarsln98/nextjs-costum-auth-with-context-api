'use client';

import { usePageTitle } from '@/hooks/usePageTitle';
import { AuthContext } from '@/types/user';
import { Button } from '@mui/material';
import { useContext } from 'react';

export default function Home() {
  const { logout } = useContext(AuthContext);
  usePageTitle('GTÜ - Vending Machine');

  return (
    <>
      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Button onClick={logout}>Logout</Button>
      </main>
    </>
  );
}
