import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Save, Upload, PlusCircle, FileJson, Settings } from 'lucide-react';
import WorkflowSettingsPanel from './WorkflowSettingsPanel';
import JSONModal from '@/common/components/JSONModal';
import SettingsModal from '@/common/components/SettingsModal';

const WorkflowToolbar = ({ onExportJSON, onSaveLoad, onCreateFlow }) => {
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [jsonData, setJsonData] = useState(null);

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
  }, [onExportJSON]);

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
        } catch (error) {
          console.error('Failed to load the workflow. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [onSaveLoad]);

  const handleCheckJSON = useCallback(() => {
    const jsonContent = onExportJSON();
    setJsonData(jsonContent);
    setShowJSONModal(true);
  }, [onExportJSON]);

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
    <div className="flex flex-col space-y-2 p-2 bg-gray-800 rounded-md shadow-md">
      <div className="flex space-x-2">
        {renderButton(<Save className="h-6 w-6 text-gray-300" />, "Save Workflow", handleSave, "Save Workflow")}
        {renderButton(<Upload className="h-6 w-6 text-gray-300" />, "Upload/Load Workflow", handleUpload, "Upload/Load Workflow")}
        {renderButton(<PlusCircle className="h-6 w-6 text-gray-300" />, "Create New Flow", onCreateFlow, "Create New Flow")}
        {renderButton(<FileJson className="h-6 w-6 text-gray-300" />, "Check JSON Schema", handleCheckJSON, "Check JSON Schema")}
        {renderButton(<Settings className="h-6 w-6 text-gray-300" />, "Settings", () => setShowSettingsModal(true), "Settings")}
      </div>
      <WorkflowSettingsPanel />
      <JSONModal
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
        jsonData={jsonData}
      />
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};

WorkflowToolbar.propTypes = {
  onExportJSON: PropTypes.func.isRequired,
  onSaveLoad: PropTypes.func.isRequired,
  onCreateFlow: PropTypes.func.isRequired,
};

export default WorkflowToolbar;


// Path: src/features/workflow/components/WorkflowToolbar.jsx