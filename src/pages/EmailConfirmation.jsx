import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/supabase';
import { Button } from "@/common/components/ui/button";
import { useToast } from "@/common/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { CheckCircle2, XCircle } from 'lucide-react';

const EmailConfirmation = () => {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const { error } = await supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN') {
            setConfirmationStatus('success');
            toast({
              title: "Success",
              description: "Your email has been confirmed successfully.",
            });
          }
        });

        if (error) throw error;
      } catch (error) {
        console.error('Error during email confirmation:', error);
        setConfirmationStatus('error');
        toast({
          title: "Error",
          description: "There was an error confirming your email. Please try again.",
          variant: "destructive",
        });
      }
    };

    confirmEmail();
  }, [toast]);

  return (
    <div className="flex min-h-screen bg-background items-center justify-center">
      <div className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg">
        {confirmationStatus === 'pending' && (
          <Alert>
            <AlertTitle>Confirming your email</AlertTitle>
            <AlertDescription>
              Please wait while we confirm your email address...
            </AlertDescription>
          </Alert>
        )}
        {confirmationStatus === 'success' && (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Email Confirmed</AlertTitle>
            <AlertDescription>
              Your email has been successfully confirmed. You can now log in to your account.
            </AlertDescription>
          </Alert>
        )}
        {confirmationStatus === 'error' && (
          <Alert>
            <XCircle className="h-4 w-4 text-red-500" />
            <AlertTitle>Confirmation Failed</AlertTitle>
            <AlertDescription>
              There was an error confirming your email. Please try again or contact support.
            </AlertDescription>
          </Alert>
        )}
        <Button 
          className="mt-4 w-full" 
          onClick={() => navigate('/login')}
          disabled={confirmationStatus === 'pending'}
        >
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmation;