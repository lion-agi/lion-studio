import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Zap, Save, Upload, PlusCircle, FileJson, Play, Pause, Undo, Redo, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/common/components/ui/dialog";
import JSONModal from '@/common/components/JSONModal';

const WorkflowOperationsPanel = ({ 
  onExportJSON, 
  onSaveLoad, 
  onCreateAgenticFlow, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onSaveSettings
}) => {
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#1A2530');
  const [autoSave, setAutoSave] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleExportJSON = () => {
    const jsonData = onExportJSON();
    setShowJSONModal(true);
  };

  const handleSave = () => {
    const flow = onExportJSON();
    localStorage.setItem('savedWorkflow', JSON.stringify(flow));
  };

  const handleLoad = () => {
    const savedFlow = localStorage.getItem('savedWorkflow');
    if (savedFlow) {
      onSaveLoad(JSON.parse(savedFlow));
    }
  };

  const handleSettingsSave = () => {
    onSaveSettings({
      backgroundColor,
      autoSave,
      performanceMode,
      theme
    });
    setShowSettingsModal(false);
  };

  return (
    <Card className="bg-gray-800 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          Workflow Operations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-3 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleExportJSON}>
                  <FileJson className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export JSON</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Workflow</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleLoad}>
                  <Upload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Load Workflow</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onCreateAgenticFlow}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New Agentic Flow</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onUndo} disabled={!canUndo}>
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onRedo} disabled={!canRedo}>
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setShowSettingsModal(true)}>
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>

      <JSONModal
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
        jsonData={onExportJSON()}
      />

      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Workflow Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-[100px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoSave">Auto Save</Label>
              <Switch id="autoSave" checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="performanceMode">Performance Mode</Label>
              <Switch id="performanceMode" checked={performanceMode} onCheckedChange={setPerformanceMode} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[180px]">
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
          <DialogFooter>
            <Button onClick={handleSettingsSave}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default WorkflowOperationsPanel;