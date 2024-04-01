'use client';

import { AuthContext } from '@/types/user';
import { Button } from '@mui/material';
import { useContext } from 'react';

export default function Home() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <main>
        <Button onClick={logout}>Logout</Button>
      </main>
    </>
  );
}
