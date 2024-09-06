import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSupabaseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;