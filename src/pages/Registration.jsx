import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSupabaseAuth } from '@/integrations/supabase';
import { supabase } from '@/integrations/supabase/supabase';
import { useToast } from "@/components/ui/use-toast";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (session) {
    navigate('/profile');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms & Conditions",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Registration successful. Please check your email to verify your account.",
      });
      navigate('/login');
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

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-indigo-600 p-12 text-white flex flex-col justify-between">
        <img src="/lion-studio-logo.svg" alt="Lion Studio Logo" className="w-24 h-24" />
        <div>
          <h1 className="text-4xl font-bold mb-4">Intelligent Workflow Automation</h1>
          <img src="/workflow-illustration.jpg" alt="Workflow Illustration" className="w-full rounded-lg shadow-lg" />
        </div>
      </div>
      <div className="flex-1 p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-6">Create an account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked }))}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the Terms & Conditions
              </label>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Log in</Link>
            </p>
          </div>
          <div className="mt-6 space-y-4">
            <Button variant="outline" className="w-full" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
              <img src="/google-logo.svg" alt="Google" className="w-5 h-5 mr-2" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => supabase.auth.signInWithOAuth({ provider: 'apple' })}>
              <img src="/apple-logo.svg" alt="Apple" className="w-5 h-5 mr-2" />
              Sign up with Apple
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

export default Registration;