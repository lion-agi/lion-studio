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
  const [gridSize, setGridSize] = useState(20);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const value = {
    backgroundColor,
    setBackgroundColor,
    gridSize,
    setGridSize,
    snapToGrid,
    setSnapToGrid,
  };

  return (
    <WorkflowSettingsContext.Provider value={value}>
      {children}
    </WorkflowSettingsContext.Provider>
  );
};