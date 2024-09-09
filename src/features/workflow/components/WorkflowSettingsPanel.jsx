import React from 'react';
import { useWorkflowSettings } from './WorkflowSettingsContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Slider } from "@/common/components/ui/slider";
import { Label } from "@/common/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Settings, Palette, Eye, Zap } from 'lucide-react';

const backgroundColors = {
  'Dark Blue': '#1A2530',
  'Light Gray': '#F0F4F8',
  'Dark Gray': '#2C3E50',
  'Navy': '#34495E',
};

const WorkflowSettingsPanel = () => {
  const { 
    backgroundColor, 
    setBackgroundColor,
    autoSave,
    setAutoSave,
    performanceMode,
    setPerformanceMode,
    theme,
    setTheme,
  } = useWorkflowSettings();

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
            <Select value={backgroundColor} onValueChange={setBackgroundColor}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(backgroundColors).map(([name, color]) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                      {name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Auto Save
            </Label>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Performance Mode
            </Label>
            <Switch checked={performanceMode} onCheckedChange={setPerformanceMode} />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowSettingsPanel;