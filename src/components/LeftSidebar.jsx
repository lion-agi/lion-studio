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
      description: "Your workflow has been successfully saved.",
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
              aria-label="Save Workflow"
              className="hover:bg-gray-700 active:bg-gray-600"
            >
              <Save className="h-6 w-6" />
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
              onClick={onSaveLoad}
              aria-label="Load Workflow"
              className="hover:bg-gray-700 active:bg-gray-600"
            >
              <Upload className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Load Workflow</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onCreateAgenticFlow}
              aria-label="Create New Flow"
              className="hover:bg-gray-700 active:bg-gray-600"
            >
              <PlusCircle className="h-6 w-6" />
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
              aria-label="Help"
              className="hover:bg-gray-700 active:bg-gray-600"
            >
              <HelpCircle className="h-6 w-6" />
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
              aria-label="Settings"
              className="hover:bg-gray-700 active:bg-gray-600"
            >
              <Settings className="h-6 w-6" />
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