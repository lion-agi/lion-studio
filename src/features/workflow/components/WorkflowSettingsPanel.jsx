import React from 'react';
import { useWorkflowSettings } from './WorkflowSettingsContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Settings, Palette, Eye, Zap } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";

const presetColors = [
  { name: 'Dark Blue', value: '#1A2530' },
  { name: 'Light Gray', value: '#F0F4F8' },
  { name: 'Dark Gray', value: '#2C3E50' },
  { name: 'Navy', value: '#34495E' },
  { name: 'Forest Green', value: '#2ECC71' },
  { name: 'Deep Purple', value: '#8E44AD' },
];

const WorkflowSettingsPanel = ({ onClose }) => {
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

  const [tempBackgroundColor, setTempBackgroundColor] = React.useState(backgroundColor);

  const handleSave = () => {
    setBackgroundColor(tempBackgroundColor);
    onClose();
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
            <Select value={tempBackgroundColor} onValueChange={setTempBackgroundColor}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select color" />
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
                <SelectItem value="custom">Custom Color</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {tempBackgroundColor === 'custom' && (
            <div className="flex items-center justify-between">
              <Label className="text-sm">Custom Color</Label>
              <Input
                type="color"
                value={tempBackgroundColor}
                onChange={(e) => setTempBackgroundColor(e.target.value)}
                className="w-[100px]"
              />
            </div>
          )}
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
          <Button onClick={handleSave} className="w-full mt-4">
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowSettingsPanel;