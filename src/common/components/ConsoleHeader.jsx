import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import {
  LayoutDashboard,
  Link as LinkIcon,
  Rocket,
  Library,
  GitBranch,
  LogOut,
  User,
  Settings
} from 'lucide-react';

const ConsoleHeader = () => {
  const { logout } = useSupabaseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/console/dashboard', icon: LayoutDashboard },
    { name: 'Integrations', path: '/console/integrations', icon: LinkIcon },
    { name: 'Deployment', path: '/console/deployment', icon: Rocket },
    { name: 'Library', path: '/console/library', icon: Library },
    { name: 'Workflow', path: '/console/workflow', icon: GitBranch },
    { name: 'Profile', path: '/console/user-profile', icon: User },
    { name: 'Admin', path: '/console/admin', icon: Settings },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-6">
          <div 
            onClick={handleLogoClick} 
            className="text-2xl font-bold cursor-pointer"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              Lion Studio
            </span>
          </div>
          <Button onClick={logout} variant="outline" size="sm" className="hover:bg-gray-800 transition-colors duration-200">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
        <nav className="flex space-x-2 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 whitespace-nowrap ${
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
