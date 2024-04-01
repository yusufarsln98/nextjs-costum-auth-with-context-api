import { useKeyPress } from '@/hooks/useKeyPress';
import { Alert } from '@mui/material';
import React from 'react';

export default function ErrorAlert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useKeyPress('Escape', onClose);

  return (
    <Alert
      severity='error'
      onClose={onClose}
      sx={{
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {message}
    </Alert>
  );
}
