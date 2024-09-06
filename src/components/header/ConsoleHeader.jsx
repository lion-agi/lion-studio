import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';

const ConsoleHeader = () => {
  const { logout } = useSupabaseAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Workflows', path: '/console/workflows' },
    { name: 'Prompts', path: '/console/prompts' },
    { name: 'Connections', path: '/console/connections' },
    { name: 'Library', path: '/console/library' },
    { name: 'Evaluations', path: '/console/evaluations' },
    { name: 'Deployments', path: '/console/deployments' },
    { name: 'Monitoring', path: '/console/monitoring' },
  ];

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/console" className="text-2xl font-bold">Lion Studio</Link>
          <Button onClick={logout} variant="outline">Log Out</Button>
        </div>
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.startsWith(item.path)
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default ConsoleHeader;