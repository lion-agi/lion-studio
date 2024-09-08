import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import {
  LayoutDashboard,
  Link as LinkIcon,
  Rocket,
  Library,
  GitBranch,
  LogOut
} from 'lucide-react';

const ConsoleHeader = () => {
  const { logout } = useSupabaseAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/console/dashboard', icon: LayoutDashboard },
    { name: 'Library', path: '/console/library', icon: Library },
    { name: 'Workflow', path: '/console/workflow', icon: GitBranch },
    { name: 'Integrations', path: '/console/connections', icon: LinkIcon },
    { name: 'Deployment', path: '/console/deployment', icon: Rocket },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-5">
          <Link to="/console" className="text-[1.75rem] font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Lion Studio
            </span>
          </Link>
          <Button onClick={logout} variant="outline" size="sm" className="hover:bg-gray-800 transition-colors duration-200">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
        <nav className="flex flex-wrap space-x-2 -mb-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 mb-2 ${
                location.pathname.startsWith(item.path)
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default ConsoleHeader;