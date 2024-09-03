import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '@/integrations/supabase';
import { supabase } from '@/integrations/supabase/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (session) {
      navigate('/editor');
    }
  }, [session, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      navigate('/editor');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      toast({
        title: "Error",
        description: "Failed to log in. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    toast({
      title: "Not Implemented",
      description: `${provider} login is not yet integrated.`,
      variant: "warning",
    });
  };

  if (session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-indigo-600 p-12 text-white flex flex-col justify-between">
        <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-24 h-24 object-contain" />
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <img src="/workflow-illustration.jpg" alt="Workflow Illustration" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-6">Log in to your account</h2>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center">
              <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Sign up</Link>
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => handleOAuthLogin('Google')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Log in with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => handleOAuthLogin('Apple')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.09.41-1.09-.5-2.08-.52-3.23 0-1.44.66-2.2.53-3.05-.41C3.21 15.64 3.9 8.25 9.04 7.91c1.22.07 2.06.63 2.79.63.73 0 2.09-.62 3.54-.53 1.55.12 2.69.77 3.43 1.91-3.05 1.75-2.54 5.93.71 7.13-.65 1.37-1.47 2.73-2.46 3.23zM15.31 6.08c-1.39-.91-2.58-.94-2.76-1.66C13.62.52 17.5.02 17.5.02s.07 2.99-2.19 6.06z"/>
              </svg>
              Log in with Apple
            </Button>
          </div>
        </div>
      </div>
      <Link to="/" className="absolute top-4 right-4">
        <Button variant="ghost">Back to website</Button>
      </Link>
    </div>
  );
};

export default Login;