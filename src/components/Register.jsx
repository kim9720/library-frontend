// Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Container, Typography, TextField, Button, Modal } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleRegister = async () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post('https://kim.nuwarisha.org/public/api/register', {
          name,
          email,
          password,
          role: 'user', // Set the default role to 'user'
        });

        // Display the success modal
        setSuccessModalOpen(true);
      } catch (error) {
        console.error('Registration failed:', error.response?.data.error);
        setErrors({ registration: 'Registration failed. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleCloseSuccessModal = () => {
    // Close the success modal and redirect to login
    setSuccessModalOpen(false);
    // Replace '/login' with your actual login route
    window.location.href = '/login';
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '450px' }}>
        <CardContent>
          <Typography variant="h5" component="div" style={{ marginBottom: '1rem' }}>
            Register
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name ? true : false}
              helperText={errors.name}
            />
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '1rem' }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
            />
            {/* Hidden field for role */}
            <input type="hidden" name="role" value="user" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </form>
          <hr/>
          <Typography variant="body2" style={{ marginTop: '1rem' }}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Modal open={successModalOpen} onClose={handleCloseSuccessModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', outline: 'none' }}>
          <Typography variant="h6" style={{ marginBottom: '1rem' }}>Registration Successful!</Typography>
          <Typography>Your account has been successfully registered. You can now proceed to login.</Typography>
          <Button variant="contained" color="primary" onClick={handleCloseSuccessModal} style={{ marginTop: '1rem' }}>
            Go to Login
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Register;
