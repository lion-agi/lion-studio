import React, { useState, useEffect } from 'react';
import { Button } from "@/common/components/ui/button";
import { Select, SelectItem } from "@/common/components/ui/select";
import { saveUserPreference, loadUserPreference } from "@/common/utils/userPreferences";

const backgroundOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];

const WorkflowCanvas = () => {
  const [background, setBackground] = useState('light');

  useEffect(() => {
    const savedBackground = loadUserPreference('workflowCanvasBackground');
    if (savedBackground) {
      setBackground(savedBackground);
    }
  }, []);

  const handleBackgroundChange = (value) => {
    setBackground(value);
    saveUserPreference('workflowCanvasBackground', value);
  };

  return (
    <div className={`workflow-canvas bg-${background}`}>
      <div className="background-selector">
        <Select value={background} onChange={handleBackgroundChange}>
          {backgroundOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      {/* Add your workflow canvas content here */}
    </div>
  );
};

export default WorkflowCanvas;
