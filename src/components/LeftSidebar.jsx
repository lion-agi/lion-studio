import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Save, Upload, PlusCircle, HelpCircle, Settings } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const LeftSidebar = ({ onExportJSON, onSaveLoad, onCreateAgenticFlow, onShowHelp, onShowSettings }) => {
  const { toast } = useToast();

  const handleSave = () => {
    onExportJSON();
    toast({
      title: "Workflow Saved",
      description: "Your current workflow has been saved successfully.",
    });
  };

  const handleUpload = () => {
    onSaveLoad();
    toast({
      title: "Upload/Load Workflow",
      description: "Please select a workflow to load or upload a new one.",
    });
  };

  const handleCreate = () => {
    onCreateAgenticFlow();
    toast({
      title: "Create New Flow",
      description: "Starting a new Agentic Flow. Please configure your workflow.",
    });
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
              onClick={onShowSettings}
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
    </div>
  );
};

export default LeftSidebar;