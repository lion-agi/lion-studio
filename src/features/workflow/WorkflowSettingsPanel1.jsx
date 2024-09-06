import React from 'react';
import { useWorkflowSettings } from './WorkflowSettingsContext1';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Slider } from "@/common/components/ui/slider";
import { Label } from "@/common/components/ui/label";
import { reactFlowBackgroundColors } from './colorPalettes';

const WorkflowSettingsPanel = () => {
  const { 
    backgroundColor, 
    setBackgroundColor, 
    gridSize, 
    setGridSize, 
    snapToGrid, 
    setSnapToGrid 
  } = useWorkflowSettings();

  return (
    <div className="p-4 space-y-4 bg-background/80 backdrop-blur-sm rounded-lg">
      <div>
        <Label>Background Color</Label>
        <Select value={backgroundColor} onValueChange={setBackgroundColor}>
          <SelectTrigger>
            <SelectValue placeholder="Select background color" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(reactFlowBackgroundColors).map(([name, color]) => (
              <SelectItem key={color} value={color}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                  {name.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Grid Size</Label>
        <Slider 
          min={10} 
          max={50} 
          step={5} 
          value={[gridSize]} 
          onValueChange={([value]) => setGridSize(value)} 
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Snap to Grid</Label>
        <Switch checked={snapToGrid} onCheckedChange={setSnapToGrid} />
      </div>
    </div>
  );
};

export default WorkflowSettingsPanel;