import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';

const MainWebsiteHeader = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Lion Studio</Link>
        <nav className="flex items-center space-x-4">
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