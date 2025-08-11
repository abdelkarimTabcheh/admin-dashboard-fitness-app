//components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
