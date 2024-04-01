'use client';

import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext, Message } from '@/types/user';
import ErrorAlert from '@/components/ErrorAlert';

const Copyright = (props: any) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        VMMS - Web Application
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default function Page() {
  const { signUp } = useContext(AuthContext);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<Message>({
    message: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signUp(
      {
        username: data.get('email') as string,
        password: data.get('password') as string,
        name: (data.get('firstName') + ' ' + data.get('lastName')).trim(),
      },
      setErrorAlert,
      setErrorMessage,
    );
  };

  console.log(errorAlert, errorMessage);

  return (
    <>
      {errorAlert && (
        <ErrorAlert
          message={errorMessage?.message}
          onClose={() => {
            setErrorAlert(false);
          }}
        />
      )}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                margin='normal'
                required
                id='firstName'
                label='First Name'
                name='firstName'
                autoComplete='firstName'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lastName'
                autoFocus
              />
            </Box>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid item>
              <Link href='/login' variant='body2'>
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
}
