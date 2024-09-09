import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Checkbox } from "@/common/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { InfoIcon } from 'lucide-react';
import { useRegistration } from '../../common/hooks/useRegistration';
import SocialSignUpButtons from '../../common/components/SocialSignUpButtons';

const Registration = () => {
  const {
    formData,
    loading,
    emailSent,
    handleInputChange,
    handleSubmit,
    handleSocialSignUp,
    navigate
  } = useRegistration();

  if (emailSent) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Check your email</AlertTitle>
            <AlertDescription>
              We've sent you an email with a link to verify your account. Please check your inbox and click the link to complete your registration.
            </AlertDescription>
          </Alert>
          <Button className="mt-4 w-full" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 bg-gradient-to-br from-purple-600 to-indigo-600 p-12 text-white flex flex-col justify-between">
        <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-24 h-24 object-contain" />
        <div>
          <h1 className="text-4xl font-bold mb-4">Intelligent Workflow Automation</h1>
          <img src="/demo2.jpg" alt="Workflow Illustration" className="w-full rounded-lg shadow-lg" />
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
                onCheckedChange={(checked) => handleInputChange({ target: { name: 'agreeTerms', type: 'checkbox', checked } })}
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
          <SocialSignUpButtons handleSocialSignUp={handleSocialSignUp} />
        </div>
      </div>
      <Link to="/" className="absolute top-4 right-4">
        <Button variant="ghost">Back to website</Button>
      </Link>
    </div>
  );
};

export default Registration;
