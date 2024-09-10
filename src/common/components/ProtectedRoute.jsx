import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '../../integrations/supabase/auth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSupabaseAuth();
  const location = useLocation();

  if (loading) {
    return null; // The GlobalLoading component will handle the loading state
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;