import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, Upload, PlusCircle, HelpCircle, Settings, FileJson } from 'lucide-react';

const EditorSidebar = ({ onExportJSON, onSaveLoad, onCreateAgenticFlow }) => {
  return (
    <div className="w-16 bg-gray-800 p-2 flex flex-col items-center space-y-4">
      <Button variant="ghost" size="icon" onClick={onSaveLoad} aria-label="Save/Load Workflow">
        <Save className="h-6 w-6 text-gray-300" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onSaveLoad} aria-label="Upload/Load Workflow">
        <Upload className="h-6 w-6 text-gray-300" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onCreateAgenticFlow} aria-label="Create New Flow">
        <PlusCircle className="h-6 w-6 text-gray-300" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onExportJSON} aria-label="Check JSON Schema">
        <FileJson className="h-6 w-6 text-gray-300" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Help">
        <HelpCircle className="h-6 w-6 text-gray-300" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Settings">
        <Settings className="h-6 w-6 text-gray-300" />
      </Button>
    </div>
  );
};

export default EditorSidebar;