import React, { useEffect, useState } from 'react';
import { saveUserPreference, loadUserPreference } from "@/common/utils/userPreferences";
import { Button } from "@/common/components/ui/button";
import { Select, SelectItem } from "@/common/components/ui/select";

const PerformanceOptimization = () => {
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

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'b') {
      const nextBackground = background === 'light' ? 'dark' : 'light';
      handleBackgroundChange(nextBackground);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [background]);

  return (
    <div className={`performance-optimization bg-${background}`}>
      <div className="background-selector">
        <Select value={background} onChange={handleBackgroundChange}>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </Select>
      </div>
      <Button onClick={() => handleBackgroundChange('light')}>Light Background</Button>
      <Button onClick={() => handleBackgroundChange('dark')}>Dark Background</Button>
    </div>
  );
};

export default PerformanceOptimization;


// Path: src/common/components/PerformanceOptimization.jsx