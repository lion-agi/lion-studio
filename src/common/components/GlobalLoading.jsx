import React from 'react';
import { useSupabaseAuth } from '../../integrations/supabase/auth';
import { Loader2 } from 'lucide-react';

const GlobalLoading = () => {
  const { loading } = useSupabaseAuth();

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg font-semibold text-primary">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoading;