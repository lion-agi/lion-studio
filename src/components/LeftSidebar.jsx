import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Save, Upload, PlusCircle, HelpCircle, Settings, FileJson } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const LeftSidebar = ({ onExportJSON, onSaveLoad, onCreateAgenticFlow, onShowHelp }) => {
  const { toast } = useToast();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(false);

  const handleSave = () => {
    const jsonContent = onExportJSON();
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved as a JSON file.",
    });
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const jsonContent = JSON.parse(event.target.result);
          onSaveLoad(jsonContent);
          toast({
            title: "Workflow Loaded",
            description: "Your workflow has been successfully loaded.",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load the workflow. Please check the file format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleCreate = () => {
    onCreateAgenticFlow();
    toast({
      title: "New Flow Created",
      description: "A new Agentic Flow has been created.",
    });
  };

  const handleCheckJSON = () => {
    const jsonContent = onExportJSON();
    // Implement your JSON schema validation logic here
    const isValid = true; // Replace with actual validation result
    if (isValid) {
      toast({
        title: "JSON Schema Valid",
        description: "The current workflow JSON schema is valid.",
      });
    } else {
      toast({
        title: "JSON Schema Invalid",
        description: "The current workflow JSON schema is invalid. Please check your workflow.",
        variant: "destructive",
      });
    }
  };

  const handleSettingsChange = (setting, value) => {
    if (setting === 'darkMode') {
      setDarkMode(value);
      // Implement dark mode logic here
    } else if (setting === 'autoSave') {
      setAutoSave(value);
      // Implement auto-save logic here
    }
  };

  return (
    <div className="w-16 bg-gray-800 p-2 flex flex-col items-center space-y-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="hover:bg-gray-700 active:bg-gray-600"
              aria-label="Save Workflow"
            >
              <Save className="h-6 w-6 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Save Workflow</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpload}
              className="hover:bg-gray-700 active:bg-gray-600"
              aria-label="Upload/Load Workflow"
            >
              <Upload className="h-6 w-6 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Upload/Load Workflow</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCreate}
              className="hover:bg-gray-700 active:bg-gray-600"
              aria-label="Create New Flow"
            >
              <PlusCircle className="h-6 w-6 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create New Flow</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCheckJSON}
              className="hover:bg-gray-700 active:bg-gray-600"
              aria-label="Check JSON Schema"
            >
              <FileJson className="h-6 w-6 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Check JSON Schema</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onShowHelp}
              className="hover:bg-gray-700 active:bg-gray-600"
              aria-label="Help"
            >
              <HelpCircle className="h-6 w-6 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Help</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettingsDialog(true)}
              className="hover:bg-gray-700 active:bg-gray-600"
              aria-label="Settings"
            >
              <Settings className="h-6 w-6 text-gray-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={(checked) => handleSettingsChange('darkMode', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-save">Auto Save</Label>
              <Switch
                id="auto-save"
                checked={autoSave}
                onCheckedChange={(checked) => handleSettingsChange('autoSave', checked)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeftSidebar;