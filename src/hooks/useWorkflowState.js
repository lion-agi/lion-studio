import { useState } from 'react';

export const useWorkflowState = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({
    basic: true,
    advanced: false,
    extensions: false,
  });

  return {
    sidebarExpanded,
    expandedCategories,
    setSidebarExpanded,
    setExpandedCategories,
  };
};