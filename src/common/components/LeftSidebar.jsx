import React, { useState, useCallback } from 'react';
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Alert, AlertDescription } from "@/common/components/ui/alert";
import { HelpCircle, Settings, Workflow, Zap, Link, MessageSquare, Brain, Database, Activity } from 'lucide-react';
import { useToast } from "@/common/components/ui/use-toast";
import JSONModal from './JSONModal';

const LeftSidebar = ({ onShowHelp, onFeatureChange }) => {
  const { toast } = useToast();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [jsonContent, setJsonContent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(false);

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
            onClick={onClick}
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

  return (
    <div className="w-16 bg-gray-800 p-2 flex flex-col items-center space-y-4">
      {renderButton(<Workflow className="h-6 w-6 text-gray-300" />, "Workflows", () => onFeatureChange('workflows'), "Workflows")}
      {renderButton(<Zap className="h-6 w-6 text-gray-300" />, "Deployments", () => onFeatureChange('deployments'), "Deployments")}
      {renderButton(<Link className="h-6 w-6 text-gray-300" />, "Connections", () => onFeatureChange('connections'), "Connections")}
      {renderButton(<MessageSquare className="h-6 w-6 text-gray-300" />, "Prompts", () => onFeatureChange('prompts'), "Prompts")}
      {renderButton(<Brain className="h-6 w-6 text-gray-300" />, "Fine-tuning", () => onFeatureChange('fine-tuning'), "Fine-tuning")}
      {renderButton(<Database className="h-6 w-6 text-gray-300" />, "Knowledge bases", () => onFeatureChange('knowledge-bases'), "Knowledge bases")}
      {renderButton(<Activity className="h-6 w-6 text-gray-300" />, "Evaluations", () => onFeatureChange('evaluations'), "Evaluations")}
      <div className="border-t border-gray-700 w-full my-2"></div>
      {renderButton(<HelpCircle className="h-6 w-6 text-gray-300" />, "Help", onShowHelp, "Help")}
      {renderButton(<Settings className="h-6 w-6 text-gray-300" />, "Settings", () => setShowSettingsDialog(true), "Settings")}

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

      <JSONModal
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
        jsonData={jsonContent}
      />
    </div>
  );
};

export default LeftSidebar;
