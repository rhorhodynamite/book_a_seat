// pages/register.js
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container, Typography, Box } from '@mui/material';
import '../../styles.css'; // Ensure this imports your stylesheet

const BackgroundContainer = styled.div`
  position: relative;
  min-height: 100vh; /* Ensure it covers the full height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function RegisterPage() {
  return (
    <BackgroundContainer>
      <div className="art-nouveau-center"></div>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h4" sx={{ marginBottom: 2 }}>
            Register
          </Typography>
          <RegisterForm />
        </Box>
      </Container>
    </BackgroundContainer>
  );
}
