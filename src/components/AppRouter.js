import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import HomeAdmin from './HomeAdmin';
import HomeUser from './HomeUser';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/admindashboard" element={<HomeAdmin />} />
        <Route path="/userdashboard" element={<HomeUser />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
