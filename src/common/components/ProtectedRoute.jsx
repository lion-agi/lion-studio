import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from './store';

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useStore();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;