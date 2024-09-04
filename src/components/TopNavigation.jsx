import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const tabs = [
  { name: 'Workflows', href: '/workflows' },
  { name: 'Deployments', href: '/deployments' },
  { name: 'Connections', href: '/connections' },
  { name: 'Prompts', href: '/prompts' },
  { name: 'Fine-tuning', href: '/fine-tuning' },
  { name: 'Knowledge bases', href: '/knowledge-bases' },
  { name: 'Evaluations', href: '/evaluations' },
  { name: 'Editor', href: '/editor' },
];

const TopNavigation = React.memo(() => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = useCallback((href) => {
    setActiveTab(href);
  }, []);

  return (
    <nav className="bg-gray-100 px-4 py-2 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
      <ul className="flex space-x-1">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link
              to={tab.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ease-in-out hover:bg-gray-200",
                activeTab === tab.href
                  ? "bg-white text-blue-600 border-t border-l border-r border-gray-200 relative transform -translate-y-px after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
                  : "text-gray-600"
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