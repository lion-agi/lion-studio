import React, { createContext, useContext, useState } from 'react';
import { reactFlowBackgroundColors } from './colorPalettes';

const WorkflowSettingsContext = createContext();

export const useWorkflowSettings = () => useContext(WorkflowSettingsContext);

export const WorkflowSettingsProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState(reactFlowBackgroundColors.midnightBlue);
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