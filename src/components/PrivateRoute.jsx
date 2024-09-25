import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If no user is found, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user exists, render the children (the protected page)
  return children;
};

export default PrivateRoute;
