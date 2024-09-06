import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';

const Home = () => {
  const navigate = useNavigate();
  const { user, signOut } = useSupabaseAuth();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleEditorClick = () => {
    navigate('/console');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-12 h-12" />
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
      
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Intelligent Workflow Automation
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Streamline your business processes with AI-powered automation solutions
        </p>
        {!user && (
          <Link to="/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </Link>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>Ready to Transform Your Business?</p>
          <p className="mt-2">Join thousands of companies already using Lion Studio for their workflow automation</p>
          {!user && (
            <Link to="/register" className="mt-4 inline-block">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Sign Up Now</Button>
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Home;