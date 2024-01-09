// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import UserHome from './components/UserHome';
import Books from './components/Books';
import Users from './components/Users';

const isAuthenticated = () => {
  return !!localStorage.getItem('token') && !!localStorage.getItem('role');
};

const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const ProtectedAdminRoute = ({ element, ...rest }) => {
  const isAdmin = localStorage.getItem('role') === 'admin';

  return isAdmin ? element : <Navigate to="/login" />;
};

const ProtectedUserRoute = ({ element, ...rest }) => {
  const isUser = localStorage.getItem('role') === 'user';

  return isUser ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <div className="preloader">
        <div className="lds-ripple">
          <div className="lds-pos"></div>
          <div className="lds-pos"></div>
        </div>
      </div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route
          path="/*"
          element={
            <div className='App' id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
              data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
              <ProtectedAdminRoute
                element={<>
                  <Header />
                  <SideBar />
                  <Routes>
                  <Route path="/dashboard"element={<Dashboard />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/users" element={<Users />} />


                  </Routes>
                  {/* Add more admin routes as needed */}
                </>}
              />
            </div>
          }
        />

        {/* User Routes */}
        <Route
          path="/userdashboard"
          element={
            <div className='App' id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
              data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
              <ProtectedUserRoute
                element={<>
                  {/* Add user-specific components and routes here */}
                  <Routes>
                  <Route index element={<UserHome />} />
                  </Routes>
                  {/* Add more user routes as needed */}
                </>}
              />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
