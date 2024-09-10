import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Undo, Redo, Lock, Unlock, ZoomIn, ZoomOut, RotateCcw, FileJson } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';

const WorkflowOperationsPanel = ({ 
  onZoomIn,
  onZoomOut,
  onResetView,
  onShowJSONModal,
  undo,
  redo,
  canUndo,
  canRedo
}) => {
  const { isGraphLocked, setIsGraphLocked } = useWorkflowStore();

  const renderButton = (icon, label, onClick, disabled = false) => (
    <TooltipProvider key={label}>
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
    { icon: <FileJson className="h-4 w-4" />, label: "View JSON", onClick: onShowJSONModal },
    { icon: <Undo className="h-4 w-4" />, label: "Undo", onClick: undo, disabled: !canUndo },
    { icon: <Redo className="h-4 w-4" />, label: "Redo", onClick: redo, disabled: !canRedo },
    { icon: isGraphLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />, label: isGraphLocked ? "Unlock Graph" : "Lock Graph", onClick: () => setIsGraphLocked(!isGraphLocked) },
    { icon: <ZoomIn className="h-4 w-4" />, label: "Zoom In", onClick: onZoomIn },
    { icon: <ZoomOut className="h-4 w-4" />, label: "Zoom Out", onClick: onZoomOut },
    { icon: <RotateCcw className="h-4 w-4" />, label: "Reset View", onClick: onResetView },
  ];

  return (
    <Card className="bg-gray-800 text-white mt-2 border border-gray-700 rounded-lg shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          Workflow Operations
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <ScrollArea className="h-[132px] pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent' }}>
          <div className="grid grid-cols-3 gap-2">
            {buttons.map((button) => renderButton(button.icon, button.label, button.onClick, button.disabled))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WorkflowOperationsPanel;