// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      // Form validation failed
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token, dashboardRoute } = response.data;

      // Save the token to local storage or a state management solution if needed
      localStorage.setItem('authToken', token);

      // Redirect to the appropriate dashboardRoute
      navigate(`/${dashboardRoute}`);

    } catch (error) {
      console.error('Login failed:', error.response?.data.error);
      setErrors({ login: 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '450px' }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ marginBottom: '1rem' }}>
            Login
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
           
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Login
            </Button>
          </form>
          {errors.login && (
            <Typography variant="body2" style={{ color: 'red', marginTop: '1rem' }}>
              {errors.login}
            </Typography>
          )}
          <hr />
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
          <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
            Forgot your password? <Link to="/forgot-password">Reset Password</Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
