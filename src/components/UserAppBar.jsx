// Updated UserAppBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { AppBar, Toolbar, Typography, Button, IconButton, Link, Avatar, ListItemIcon, createTheme, ThemeProvider, Popover, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f0954',
    },
  },
});

const UserAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-menu' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TIES|Library
          </Typography>
        
          <Link href="/userdashboard" color="inherit" sx={{ textDecoration: 'none', typography: 'body2' }}>
            <Button color="inherit" variant="text">List of books</Button>
          </Link>
          <Link href="/userdashboard/favorite" color="inherit" sx={{ textDecoration: 'none', typography: 'body2' }}>
            <Button color="inherit" variant="text">Favorite Books</Button>
          </Link>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircleIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Popover>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default UserAppBar;
