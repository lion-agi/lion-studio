import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';

const MainWebsiteHeader = () => {
  const { session } = useSupabaseAuth();

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Lion Studio</Link>
        <nav className="space-x-4">
          <Link to="/features" className="hover:text-blue-400">Features</Link>
          <Link to="/pricing" className="hover:text-blue-400">Pricing</Link>
          <Link to="/about" className="hover:text-blue-400">About</Link>
          {session ? (
            <Button as={Link} to="/console" variant="primary">Go to Console</Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost">Log In</Button>
              <Button as={Link} to="/signup" variant="primary">Sign Up</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default MainWebsiteHeader;