// pages/register.js
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container, Typography, Box } from '@mui/material';

export default function RegisterPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
}
