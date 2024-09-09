import React, { useState, useEffect } from 'react';
import { useWorkflowSettings } from './WorkflowSettingsContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Settings, Palette, Eye } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { X } from 'lucide-react';

const presetColors = [
  { name: 'Dark Blue', value: '#1A2530' },
  { name: 'Light Gray', value: '#F0F4F8' },
  { name: 'Dark Gray', value: '#2C3E50' },
  { name: 'Navy', value: '#34495E' },
];

const WorkflowSettingsPanel = ({ onClose }) => {
  const { 
    backgroundColor, 
    setBackgroundColor,
    autoSave,
    setAutoSave,
    theme,
    setTheme,
  } = useWorkflowSettings();

  const [tempBackgroundColor, setTempBackgroundColor] = useState(backgroundColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColorName, setCustomColorName] = useState('');
  const [customColors, setCustomColors] = useState([]);

  useEffect(() => {
    const savedCustomColors = localStorage.getItem('customColors');
    if (savedCustomColors) {
      setCustomColors(JSON.parse(savedCustomColors));
    }
  }, []);

  useEffect(() => {
    setTempBackgroundColor(backgroundColor);
  }, [backgroundColor]);

  const handleSave = () => {
    setBackgroundColor(tempBackgroundColor);
    localStorage.setItem('backgroundColor', tempBackgroundColor);
    onClose();
  };

  const handleCustomColorSave = () => {
    if (customColorName && tempBackgroundColor) {
      const newCustomColor = { name: customColorName, value: tempBackgroundColor };
      const updatedCustomColors = [...customColors, newCustomColor];
      setCustomColors(updatedCustomColors);
      localStorage.setItem('customColors', JSON.stringify(updatedCustomColors));
      setCustomColorName('');
      setShowColorPicker(false);
    }
  };

  const handleColorChange = (color) => {
    setTempBackgroundColor(color);
    setBackgroundColor(color);
  };

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Workflow Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Background
            </Label>
            <Select 
              value={tempBackgroundColor} 
              onValueChange={(value) => {
                if (value === 'custom') {
                  setShowColorPicker(true);
                } else {
                  handleColorChange(value);
                  setShowColorPicker(false);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select color">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: tempBackgroundColor }} />
                    {tempBackgroundColor === backgroundColor ? 'Current Color' : 'Custom'}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {presetColors.map(({ name, value }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: value }} />
                      {name}
                    </div>
                  </SelectItem>
                ))}
                {customColors.map(({ name, value }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: value }} />
                      {name}
                    </div>
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {showColorPicker && (
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={tempBackgroundColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-[100px]"
              />
              <Input
                type="text"
                placeholder="Color name"
                value={customColorName}
                onChange={(e) => setCustomColorName(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleCustomColorSave}>Save</Button>
              <Button variant="ghost" onClick={() => setShowColorPicker(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Auto Save
            </Label>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} className="w-full mt-4">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowSettingsPanel;

// Path: src/features/workflow/components/WorkflowSettingsPanel.jsx