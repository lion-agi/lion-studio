import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { Zap, Save, Upload, PlusCircle, FileJson, Undo, Redo, Lock, Unlock, ZoomIn, ZoomOut, RotateCcw, Download, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import JSONModal from '@/common/components/JSONModal';

const WorkflowOperationsPanel = ({ 
  onExportJSON, 
  onSaveLoad, 
  onCreateAgenticFlow, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  onSaveSettings,
  onZoomIn,
  onZoomOut,
  onResetView,
  onClearCanvas
}) => {
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isGraphLocked, setIsGraphLocked] = useState(false);

  const handleExportJSON = () => {
    const jsonData = onExportJSON();
    setShowJSONModal(true);
  };

  const handleSave = () => {
    onSaveLoad('save');
  };

  const handleLoad = () => {
    onSaveLoad('load');
  };

  const toggleGraphLock = () => {
    setIsGraphLocked(!isGraphLocked);
  };

  const renderButton = useCallback((icon, label, onClick, disabled = false) => (
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
  ), []);

  return (
    <Card className="bg-gray-800 text-white mt-12 border border-gray-700 rounded-lg shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          Workflow Operations
        </CardTitle>
      </CardHeader>
      <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
        <CardContent className="pt-2">
          <CollapsibleContent>
            <ScrollArea className="h-40 pr-4 custom-scrollbar">
              <div className="grid grid-cols-3 gap-2">
                {renderButton(<FileJson className="h-4 w-4" />, "Export JSON", handleExportJSON)}
                {renderButton(<Save className="h-4 w-4" />, "Save Workflow", handleSave)}
                {renderButton(<Upload className="h-4 w-4" />, "Load Workflow", handleLoad)}
                {renderButton(<PlusCircle className="h-4 w-4" />, "New Agentic Flow", onCreateAgenticFlow)}
                {renderButton(<Undo className="h-4 w-4" />, "Undo", onUndo, !canUndo)}
                {renderButton(<Redo className="h-4 w-4" />, "Redo", onRedo, !canRedo)}
                {renderButton(isGraphLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />, isGraphLocked ? "Unlock Graph" : "Lock Graph", toggleGraphLock)}
                {renderButton(<ZoomIn className="h-4 w-4" />, "Zoom In", onZoomIn)}
                {renderButton(<ZoomOut className="h-4 w-4" />, "Zoom Out", onZoomOut)}
                {renderButton(<RotateCcw className="h-4 w-4" />, "Reset View", onResetView)}
                {renderButton(<RefreshCw className="h-4 w-4" />, "Clear Canvas", onClearCanvas)}
                {renderButton(<Download className="h-4 w-4" />, "Download Workflow", () => {})}
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </CardContent>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>

      <JSONModal
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
        jsonData={onExportJSON()}
      />
    </Card>
  );
};

export default WorkflowOperationsPanel;