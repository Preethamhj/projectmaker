import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './mainpage';
import Login from './login';
import Register from './register';

export default function AuthApp() {
  return (
    <Router>
      <div className="auth-container">
        <Routes>
          <Route path="/" element={<Mainpage />} />
         <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
