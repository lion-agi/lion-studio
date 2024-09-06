import React from 'react';
import { useSupabaseAuth } from '../../integrations/supabase/auth';

const GlobalLoading = () => {
  const { loading } = useSupabaseAuth();

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-primary">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoading;