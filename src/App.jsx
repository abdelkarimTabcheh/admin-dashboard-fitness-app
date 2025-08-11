// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './pages/Users';
import Exercises from './pages/Exercises';
import HomeScreenConfig from './pages/HomeScreenConfig';
import SignIn from './pages/SignIn';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // simplify auth check

  return (
    <Router>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/home-config" element={<HomeScreenConfig />} />
            <Route path="*" element={<Navigate to="/users" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
