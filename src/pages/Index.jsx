import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { ArrowRight, Zap, Workflow, Bot } from 'lucide-react';

const Index = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-24 h-24 object-contain" />
        <nav>
          {session ? (
            <Button onClick={() => navigate('/editor')} className="bg-purple-600 hover:bg-purple-700">
              Go to Workflow Editor
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="mr-2">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-purple-600 hover:bg-purple-700">Sign up</Button>
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4">
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Workflow Automation
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Streamline your business processes with AI-powered automation solutions
            </p>
            <Link to={session ? "/editor" : "/register"}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20">
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

        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of companies already using Lion Studio for their workflow automation needs.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-card mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Lion Studio Workflow Automation
            </p>
            <div className="flex space-x-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-card p-6 rounded-lg shadow-lg text-center">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;