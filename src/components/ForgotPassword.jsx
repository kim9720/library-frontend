// ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Container, Typography, TextField, Button } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log('Resetting password for:', email);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '300px' }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ marginBottom: '1rem' }}>
            Forgot Password
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Reset Password
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            Remember your password? <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
