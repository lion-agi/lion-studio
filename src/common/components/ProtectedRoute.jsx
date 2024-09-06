import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupabaseAuth } from '../../integrations/supabase/auth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSupabaseAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login page, but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;