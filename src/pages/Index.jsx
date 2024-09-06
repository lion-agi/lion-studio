import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { ArrowRight, Zap, Workflow, Bot } from 'lucide-react';

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="space-y-20">
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent pb-3">
          Intelligent Workflow Automation
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Streamline your business processes with AI-powered automation solutions
        </p>
        <Link to={session ? "/editor" : "/register"}>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-yellow-500" />}
            title="Lightning Fast"
            description="Accelerate your workflows with our high-performance automation engine."
          />
          <FeatureCard
            icon={<Workflow className="h-10 w-10 text-green-500" />}
            title="Flexible Workflows"
            description="Design and customize workflows to fit your unique business needs."
          />
          <FeatureCard
            icon={<Bot className="h-10 w-10 text-blue-500" />}
            title="AI-Powered"
            description="Leverage cutting-edge AI to make your workflows smarter and more efficient."
          />
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl mb-8 text-gray-300">
          Join thousands of companies already using Lion Studio for their workflow automation needs.
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            Start Your Free Trial
          </Button>
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Index;