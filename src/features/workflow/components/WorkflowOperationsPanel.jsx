import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { Zap, Save, Upload, PlusCircle, FileJson, Play, Pause, Undo, Redo, Settings, Lock, Unlock, ZoomIn, ZoomOut, RotateCcw, Download, Share, ChevronUp, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/common/components/ui/dialog";
import JSONModal from '@/common/components/JSONModal';
import EdgePropertiesDialog from './EdgePropertiesDialog';

const WorkflowOperationsPanel = ({ 
  onExportJSON, 
  onSaveLoad, 
  onCreateAgenticFlow, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onSaveSettings,
  backgroundColor,
  isLocked,
  setIsLocked,
  onZoomIn,
  onZoomOut,
  onResetView,
  onEdgeClick
}) => {
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [tempBackgroundColor, setTempBackgroundColor] = useState(backgroundColor);
  const [autoSave, setAutoSave] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showEdgePropertiesDialog, setShowEdgePropertiesDialog] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);

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
      backgroundColor: tempBackgroundColor,
      autoSave,
      performanceMode,
      theme
    });
    setShowSettingsModal(false);
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const handleEdgeClick = useCallback((edge) => {
    setSelectedEdge(edge);
    setShowEdgePropertiesDialog(true);
  }, []);

  const presetColors = [
    { name: 'Dark Blue', value: '#1A2530' },
    { name: 'Light Gray', value: '#F0F4F8' },
    { name: 'Dark Gray', value: '#2C3E50' },
    { name: 'Navy', value: '#34495E' },
  ];

  return (
    <Card className="bg-gray-800 text-white">
      <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
        <CardHeader className="pb-2">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer">
              <CardTitle className="text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Workflow Operations
              </CardTitle>
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-2">
            <ScrollArea className="h-[120px]" style={{ backgroundColor: tempBackgroundColor }}>
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

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={toggleLock}>
                        {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isLocked ? 'Unlock' : 'Lock'} Workflow</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={onZoomIn}>
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom In</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={onZoomOut}>
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zoom Out</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={onResetView}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download Workflow</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </ScrollArea>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>

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
                <Label htmlFor="customColor">Custom Color</Label>
                <Input
                  id="customColor"
                  type="color"
                  value={tempBackgroundColor}
                  onChange={(e) => setTempBackgroundColor(e.target.value)}
                  className="w-[100px]"
                />
              </div>
            )}
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

      <EdgePropertiesDialog
        isOpen={showEdgePropertiesDialog}
        onClose={() => setShowEdgePropertiesDialog(false)}
        edge={selectedEdge}
        onSave={(updatedEdge) => {
          onEdgeClick(updatedEdge);
          setShowEdgePropertiesDialog(false);
        }}
      />
    </Card>
  );
};

export default WorkflowOperationsPanel;