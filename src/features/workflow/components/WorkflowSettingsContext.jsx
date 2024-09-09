import React, { createContext, useContext, useState } from 'react';

const WorkflowSettingsContext = createContext();

export const useWorkflowSettings = () => {
  const context = useContext(WorkflowSettingsContext);
  if (!context) {
    throw new Error('useWorkflowSettings must be used within a WorkflowSettingsProvider');
  }
  return context;
};

export const WorkflowSettingsProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('#1A2530');
  const [autoSave, setAutoSave] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  const value = {
    backgroundColor,
    setBackgroundColor,
    autoSave,
    setAutoSave,
    performanceMode,
    setPerformanceMode,
    theme,
    setTheme,
  };

  return (
    <WorkflowSettingsContext.Provider value={value}>
      {children}
    </WorkflowSettingsContext.Provider>
  );
};

// Path: src/features/workflow/components/WorkflowSettingsContext.jsx