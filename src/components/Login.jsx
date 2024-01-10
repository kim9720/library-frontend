import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

// Import the background image
import backgroundImage from './background.jpg';
import NavBar from './NavBar';

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
      const response = await axios.post('https://kim.nuwarisha.org/public/api/login', {
        email,
        password,
      });

      const { token, dashboardRoute, user } = response.data;

      // Save the token and role to local storage or a state management solution if needed
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      console.warn(response.data);

      // Redirect to the appropriate dashboardRoute
      navigate(`/${dashboardRoute}`);

    } catch (error) {
      console.error('Login failed:', error.response?.data.error);
      setErrors({ login: 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <div>
        <NavBar/>
    <Container
      maxWidth="xl" // "xl" is the class for extra-large containers
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px', // Adjust padding as needed
      }}
    >
            

      <Card style={{ width: '450px' }}>
        <CardContent>
          <Typography variant="h6" component="div" style={{ marginBottom: '1rem' }}>
            TIES | Library Login
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
    </div>
  );
};

export default Login;
