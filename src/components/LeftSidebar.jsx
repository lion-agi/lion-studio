import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Save, Upload, PlusCircle, HelpCircle, Settings, FileJson } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const LeftSidebar = ({ onExportJSON, onSaveLoad, onCreateAgenticFlow, onShowHelp }) => {
  const { toast } = useToast();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const handleSave = useCallback(() => {
    const jsonContent = onExportJSON();
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Workflow Saved", description: "Your workflow has been saved as a JSON file." });
  }, [onExportJSON, toast]);

  const handleUpload = useCallback(() => {
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
          toast({ title: "Workflow Loaded", description: "Your workflow has been successfully loaded." });
        } catch (error) {
          toast({ title: "Error", description: "Failed to load the workflow. Please check the file format.", variant: "destructive" });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [onSaveLoad, toast]);

  const handleCheckJSON = useCallback(() => {
    const jsonContent = onExportJSON();
    // Implement your JSON schema validation logic here
    const isValid = validateJSONSchema(jsonContent);
    if (isValid) {
      toast({ title: "JSON Schema Valid", description: "The current workflow JSON schema is valid." });
    } else {
      toast({ title: "JSON Schema Invalid", description: "The current workflow JSON schema is invalid. Please check your workflow.", variant: "destructive" });
    }
  }, [onExportJSON, toast]);

  const handleSettingsChange = useCallback((setting, value) => {
    if (setting === 'darkMode') {
      setDarkMode(value);
      // Implement dark mode logic here
    } else if (setting === 'autoSave') {
      setAutoSave(value);
      // Implement auto-save logic here
    }
  }, []);

  const renderButton = useCallback((icon, label, onClick, ariaLabel) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onClick();
              setActiveSidebar(label);
            }}
            className="hover:bg-gray-700 active:bg-gray-600"
            aria-label={ariaLabel}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ), []);

  const renderSecondSidebar = () => {
    switch (activeSidebar) {
      case "Save Workflow":
        return (
          <CollapsibleContent className="p-4 bg-gray-800 w-64">
            <h3 className="text-lg font-semibold mb-4">Save Options</h3>
            <Input className="mb-4" placeholder="Workflow Name" />
            <Textarea className="mb-4" placeholder="Description" />
            <Button onClick={handleSave} className="w-full">Save Workflow</Button>
          </CollapsibleContent>
        );
      case "Upload/Load Workflow":
        return (
          <CollapsibleContent className="p-4 bg-gray-800 w-64">
            <h3 className="text-lg font-semibold mb-4">Load Workflow</h3>
            <Button onClick={handleUpload} className="w-full mb-4">Choose File</Button>
            <Alert>
              <AlertDescription>Select a JSON file to load a saved workflow.</AlertDescription>
            </Alert>
          </CollapsibleContent>
        );
      case "Create New Flow":
        return (
          <CollapsibleContent className="p-4 bg-gray-800 w-64">
            <h3 className="text-lg font-semibold mb-4">New Flow</h3>
            <Input className="mb-4" placeholder="Flow Name" />
            <Button onClick={onCreateAgenticFlow} className="w-full">Create Flow</Button>
          </CollapsibleContent>
        );
      case "Check JSON Schema":
        return (
          <CollapsibleContent className="p-4 bg-gray-800 w-64">
            <h3 className="text-lg font-semibold mb-4">JSON Schema</h3>
            <Button onClick={handleCheckJSON} className="w-full mb-4">Validate Schema</Button>
            <Alert>
              <AlertDescription>Click to validate the current workflow's JSON schema.</AlertDescription>
            </Alert>
          </CollapsibleContent>
        );
      case "Help":
        return (
          <CollapsibleContent className="p-4 bg-gray-800 w-64">
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <Alert>
              <AlertDescription>Need assistance? Check our documentation or contact support.</AlertDescription>
            </Alert>
            <Button onClick={onShowHelp} className="w-full mt-4">View Documentation</Button>
          </CollapsibleContent>
        );
      default:
        return null;
    }
  };

  return (
    <Collapsible>
      <div className="flex">
        <div className="w-16 bg-gray-800 p-2 flex flex-col items-center space-y-4">
          {renderButton(<Save className="h-6 w-6 text-gray-300" />, "Save Workflow", handleSave, "Save Workflow")}
          {renderButton(<Upload className="h-6 w-6 text-gray-300" />, "Upload/Load Workflow", handleUpload, "Upload/Load Workflow")}
          {renderButton(<PlusCircle className="h-6 w-6 text-gray-300" />, "Create New Flow", onCreateAgenticFlow, "Create New Flow")}
          {renderButton(<FileJson className="h-6 w-6 text-gray-300" />, "Check JSON Schema", handleCheckJSON, "Check JSON Schema")}
          {renderButton(<HelpCircle className="h-6 w-6 text-gray-300" />, "Help", onShowHelp, "Help")}
          {renderButton(<Settings className="h-6 w-6 text-gray-300" />, "Settings", () => setShowSettingsDialog(true), "Settings")}
        </div>
        {renderSecondSidebar()}
      </div>

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
    </Collapsible>
  );
};

// Helper function to validate JSON schema (implement your validation logic here)
const validateJSONSchema = (jsonContent) => {
  // Placeholder for JSON schema validation
  // Replace this with actual validation logic
  return true;
};

export default LeftSidebar;