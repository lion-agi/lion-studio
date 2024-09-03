import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '@/integrations/supabase';
import { supabase } from '@/integrations/supabase/supabase';
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            <Button variant="outline" className="w-full" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
              <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
              Log in with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => supabase.auth.signInWithOAuth({ provider: 'apple' })}>
              <img src="/apple-logo.svg" alt="Apple" className="w-5 h-5 mr-2" />
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