import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Save, Upload, Download, RotateCcw, Plus, Undo, Redo, Lock, Unlock, ZoomIn, ZoomOut, Trash2 } from 'lucide-react';

const WorkflowOperationsPanel = ({ 
  onExportJSON, 
  onSaveLoad, 
  onCreateFlow, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onZoomIn,
  onZoomOut,
  onResetView,
  onClearCanvas,
  isGraphLocked,
  onToggleGraphLock
}) => {
  const renderButton = (icon, label, onClick, disabled = false) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            disabled={disabled}
            className="w-10 h-10 p-2"
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const buttons = [
    { icon: <Save className="h-4 w-4" />, label: "Save", onClick: () => onSaveLoad('save') },
    { icon: <Upload className="h-4 w-4" />, label: "Load", onClick: () => onSaveLoad('load') },
    { icon: <Download className="h-4 w-4" />, label: "Export JSON", onClick: onExportJSON },
    { icon: <Plus className="h-4 w-4" />, label: "New Flow", onClick: onCreateFlow },
    { icon: <Undo className="h-4 w-4" />, label: "Undo", onClick: onUndo, disabled: !canUndo },
    { icon: <Redo className="h-4 w-4" />, label: "Redo", onClick: onRedo, disabled: !canRedo },
    { icon: isGraphLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />, label: isGraphLocked ? "Unlock Graph" : "Lock Graph", onClick: onToggleGraphLock },
    { icon: <ZoomIn className="h-4 w-4" />, label: "Zoom In", onClick: onZoomIn },
    { icon: <ZoomOut className="h-4 w-4" />, label: "Zoom Out", onClick: onZoomOut },
    { icon: <RotateCcw className="h-4 w-4" />, label: "Reset View", onClick: onResetView },
    { icon: <Trash2 className="h-4 w-4" />, label: "Clear Canvas", onClick: onClearCanvas },
  ];

  return (
    <Card className="bg-gray-800 text-white mt-2 border border-gray-700 rounded-lg shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Workflow Operations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ScrollArea className="h-[132px] pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent' }}>
          <div className="grid grid-cols-3 gap-2">
            {buttons.map((button, index) => (
              <div key={index}>
                {renderButton(button.icon, button.label, button.onClick, button.disabled)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowOperationsPanel;