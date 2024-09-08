import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { Card, CardContent } from "@/common/components/ui/card";
import { useSupabaseAuth } from '@/integrations/supabase';

const Home = () => {
  const navigate = useNavigate();
  const { user, signOut } = useSupabaseAuth();

  const handleLoginClick = () => navigate('/login');
  const handleLogoutClick = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const handleEditorClick = () => navigate('/console');
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-20 h-20" />
        <nav className="space-x-2">
          {user ? (
            <>
              <Button variant="ghost" onClick={handleEditorClick}>Go to Console</Button>
              <Button variant="ghost" onClick={handleLogoutClick}>Log out</Button>
            </>
          ) : (
            <Button variant="ghost" onClick={handleLoginClick}>Log in</Button>
          )}
        </nav>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 max-w-4xl">
          Intelligent Workflow Automation
        </h1>
        <p className="text-xl max-w-2xl text-gray-300">
          Streamline your business processes with AI-powered automation solutions
        </p>
        <Card className="w-full max-w-md overflow-hidden">
          <CardContent className="p-0">
            <img src="/demo1.jpg" alt="Demo 1" className="w-full h-auto" />
          </CardContent>
        </Card>
        {!user && (
          <Link to="/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
              Get Started
            </Button>
          </Link>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your Business?</h2>
          <p className="mb-6">Join thousands of companies already using Lion Studio for their workflow automation</p>
          {!user && (
            <Link to="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Sign Up Now
              </Button>
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Home;
