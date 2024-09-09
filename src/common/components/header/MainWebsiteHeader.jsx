import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import commonStyles from '@/common/components/ui/style-guide';

const MainWebsiteHeader = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <header className="bg-gray-900 text-white py-4" style={commonStyles}>
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
              <Link to="/console" className="hover:text-gray-300">Console</Link>
              <Link to="/" className="hover:text-gray-300" onClick={logout}>Log out</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Log in</Link>
              <Link to="/register" className="hover:text-gray-300">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default MainWebsiteHeader;

// Path: src/common/components/header/MainWebsiteHeader.jsx