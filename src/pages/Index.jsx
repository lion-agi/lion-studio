import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import { ArrowRight, Zap, Workflow, Bot, LogOut } from 'lucide-react';
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center">
        <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-24 h-24 object-contain" />
        <nav className="flex items-center space-x-4">
          <ThemeToggle />
          {session ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" className="mr-2">Profile</Button>
              </Link>
              <Link to="/upload">
                <Button variant="ghost" className="mr-2">Upload Images</Button>
              </Link>
              <Link to="/editor">
                <Button variant="ghost" className="mr-2">Workflow Editor</Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="mr-2">Log in</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Rest of the component remains unchanged */}
      
    </div>
  );
};

export default Index;