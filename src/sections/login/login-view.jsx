import React, { useState } from 'react';
import { Box, Card, Stack, Typography, IconButton, InputAdornment, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'src/routes/hooks';
import axios from 'axios';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginView() {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = async () => {
    try {
      setLoading(true);

      const data = {
        email,
        password,
      };

      const response = await axios.post('https://aradax.com.et/users/login', data);

      if (response.status === 200) {
        const token = response.data.token;

        if (token) {
          localStorage.setItem('token', token);
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          router.push('/dashboard');
        } else {
          console.error('Token not present in the response');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } else {
        console.error('Unexpected response status:', response.status);

        // Handle Bad Request (status code 400)
        if (response.status === 400) {
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <br />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/assets/background/overlay_4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: 1,
          maxWidth: 420,
        }}
      >
        <Typography variant="h4">Sign in to AradaX</Typography>
        <br />
        {renderForm}
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarSeverity === 'success'
            ? 'Login successful!'
            : 'Login failed. Please check your credentials.'}
        </Alert>
      </Snackbar>
    </Box>
  );
}
