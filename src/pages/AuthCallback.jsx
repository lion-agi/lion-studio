import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/supabase';
import { useToast } from "@/common/components/ui/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
        toast({
          title: "Authentication Error",
          description: "There was an error during the authentication process. Please try again.",
          variant: "destructive",
        });
        navigate('/login');
      } else if (data?.session) {
        toast({
          title: "Authentication Successful",
          description: "You have successfully signed in.",
        });
        navigate('/profile');
      } else {
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex min-h-screen bg-background items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default AuthCallback;