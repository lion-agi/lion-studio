import React, { useState, useEffect } from 'react';
import { Label } from "@/common/components/ui/label";
import { Slider } from "@/common/components/ui/slider";
import { Switch } from "@/common/components/ui/switch";
import { Input } from "@/common/components/ui/input";
import useSettingsStore from '@/store/settingsSlice';

const AccessibilitySettings = () => {
  const { fontSize, setFontSize, highContrastMode, setHighContrastMode, screenReaderOptimization, setScreenReaderOptimization, keyboardNavigation, setKeyboardNavigation } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="fontSize" className="text-lg">Font Size</Label>
        <Slider
          id="fontSize"
          value={[fontSize]}
          onValueChange={(value) => setFontSize(value[0])}
          min={12}
          max={24}
          step={1}
        />
        <span>{fontSize}px</span>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="highContrast" className="text-lg">High Contrast Mode</Label>
        <Switch
          id="highContrast"
          checked={highContrastMode}
          onCheckedChange={setHighContrastMode}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="screenReaderOptimization" className="text-lg">Screen Reader Optimization</Label>
        <Switch
          id="screenReaderOptimization"
          checked={screenReaderOptimization}
          onCheckedChange={setScreenReaderOptimization}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="keyboardNavigation" className="text-lg">Keyboard Navigation</Label>
        <Input
          id="keyboardNavigation"
          value={keyboardNavigation}
          onChange={(e) => setKeyboardNavigation(e.target.value)}
          placeholder="Enter custom shortcuts"
        />
      </div>
    </div>
  );
};

export default AccessibilitySettings;
