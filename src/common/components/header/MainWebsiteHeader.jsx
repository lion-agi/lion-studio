import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';

const MainWebsiteHeader = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-16 h-16 mr-3" />
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Lion Studio</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/pricing" className="hover:text-gray-300">Pricing</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          {session ? (
            <>
              <Link to="/console">
                <Button variant="outline">Console</Button>
              </Link>
              <Button variant="ghost" onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="default">Sign up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default MainWebsiteHeader;
