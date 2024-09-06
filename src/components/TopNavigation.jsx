import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const tabs = [
  { name: 'Workflows Editor', href: '/editor' },
  { name: 'Prompts', href: '/prompts' },
  { name: 'Connections', href: '/connections' },
  { name: 'Library', href: '/knowledge-bases' },
  { name: 'Evaluations', href: '/evaluations' },
  { name: 'Deployments', href: '/deployments' },
  { name: 'Monitoring', href: '/monitoring' }
];

const TopNavigation = React.memo(() => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = useCallback((href) => {
    setActiveTab(href);
  }, []);

  return (
    <nav className="bg-gray-900 px-4 py-4 border-b border-gray-800 overflow-x-auto whitespace-nowrap">
      <ul className="flex space-x-1">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link
              to={tab.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out",
                activeTab === tab.href
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
              onClick={() => handleTabClick(tab.href)}
              data-testid={`nav-${tab.name.toLowerCase().replace(' ', '-')}`}
            >
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

TopNavigation.displayName = 'TopNavigation';

export default TopNavigation;