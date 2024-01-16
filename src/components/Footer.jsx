// Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '20px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} TIES|Library. All Rights Reserved.
      </Typography>
   
      <Typography variant="body2" mt={1}>
        {/* You can replace the link with your actual website or social media links */}
        <Link href="#" color="inherit" underline="hover">
          Privacy Policy
        </Link>
        {' | '}
        <Link href="#" color="inherit" underline="hover">
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
