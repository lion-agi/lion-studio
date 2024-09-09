import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import SaveLoadDialog from '@/common/components/SaveLoadDialog';
import JSONModal from '@/common/components/JSONModal';
import { nodeTypes } from '@/common/components/nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useWorkflowModals } from '../hooks/useWorkflowModals';
import { useEdgeHighlighting } from '../hooks/useEdgeHighlighting';
import { WorkflowSettingsProvider, useWorkflowSettings } from './WorkflowSettingsContext';
import { Button } from "@/common/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ChevronDown, ChevronUp, FileJson, Save, PlusCircle, Settings, Zap } from 'lucide-react';
import WorkflowSettingsPanel from './WorkflowSettingsPanel';
import NodeCreationPanel from './NodeCreationPanel';
import AgenticFlowWizard from '@/common/components/AgenticFlowWizard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";

const WorkflowEditorContent = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isCreateNodeExpanded, setIsCreateNodeExpanded] = useState(true);
  const [isOperationsExpanded, setIsOperationsExpanded] = useState(true);
  const [isAgenticFlowWizardOpen, setIsAgenticFlowWizardOpen] = useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#1A2530');

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges,
  } = useWorkflowState();

  const {
    reactFlowWrapper,
    reactFlowInstance,
    setReactFlowInstance,
    onConnect,
    onDragOver,
    onDrop,
    onNodeDragStop,
    handleExportJSON,
    handleSaveLoad,
    handleCreateAgenticFlow,
    onNodeClick,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData,
    setJsonData,
  } = useWorkflowModals();

  const { edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

  const { backgroundColor, gridSize } = useWorkflowSettings();

  const styledEdges = useMemo(() => 
    edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
    })),
    [edges, getEdgeStyle]
  );

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleSettings = () => setIsSettingsExpanded(!isSettingsExpanded);
  const toggleCreateNode = () => setIsCreateNodeExpanded(!isCreateNodeExpanded);
  const toggleOperations = () => setIsOperationsExpanded(!isOperationsExpanded);

  const handleExportJSONClick = () => {
    const jsonContent = handleExportJSON();
    setJsonData(jsonContent);
    setShowJSONModal(true);
  };

  const handleCreateFlow = () => {
    setIsAgenticFlowWizardOpen(true);
  };

  const onDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  const backgroundColors = {
    'Dark Blue': '#1A2530',
    'Light Gray': '#F0F4F8',
    'Dark Gray': '#2C3E50',
    'Navy': '#34495E',
  };

  return (
    <div ref={containerRef} className="h-full w-full relative" style={{ height: 'calc(100vh - 64px)' }}>
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        fitView
        style={{
          width: containerSize.width,
          height: containerSize.height,
          backgroundColor: selectedBackgroundColor,
        }}
      >
        <Background 
          variant="dots" 
          gap={gridSize} 
          size={1} 
          color="rgba(255, 255, 255, 0.05)" 
          style={{ zIndex: -1 }}
        />
        <Controls 
          style={{
            button: {
              backgroundColor: '#34495E',
              color: '#ECF0F1',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'user': return '#3498DB';
              case 'assistant': return '#F39C12';
              case 'group': return '#E74C3C';
              case 'initializer': return '#9B59B6';
              case 'conversation': return '#1ABC9C';
              case 'note': return '#34495E';
              default: return '#95A5A6';
            }
          }}
          nodeStrokeWidth={3} 
          zoomable 
          pannable
          style={{
            backgroundColor: '#34495E',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Panel position="top-left">
          <div className="space-y-2">
            <Card className="bg-gray-800 rounded-lg shadow-lg p-2 w-56">
              <Collapsible open={isCreateNodeExpanded} onOpenChange={setIsCreateNodeExpanded}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer flex flex-row items-center justify-between pb-1 pt-1">
                    <CardTitle className="text-xs font-semibold text-white flex items-center">
                      <PlusCircle className="mr-2 h-3 w-3" />
                      Create Node
                    </CardTitle>
                    {isCreateNodeExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-2 px-2">
                    <NodeCreationPanel />
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="bg-gray-800 rounded-lg shadow-lg p-2 w-56">
              <Collapsible open={isOperationsExpanded} onOpenChange={setIsOperationsExpanded}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer flex flex-row items-center justify-between pb-1 pt-1">
                    <CardTitle className="text-xs font-semibold text-white flex items-center">
                      <Zap className="mr-2 h-3 w-3" />
                      Workflow Operations
                    </CardTitle>
                    {isOperationsExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-2 px-2 space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={handleExportJSONClick} size="sm" className="w-full text-xs py-1 h-7">
                            <FileJson className="mr-1 h-3 w-3" />
                            Export JSON
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Export workflow as JSON</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => setShowSaveLoadDialog(true)} size="sm" className="w-full text-xs py-1 h-7">
                            <Save className="mr-1 h-3 w-3" />
                            Save/Load
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save or load workflow</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={handleCreateFlow} size="sm" className="w-full text-xs py-1 h-7">
                            <Zap className="mr-1 h-3 w-3" />
                            New Agentic Flow
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Create a new agentic flow</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="bg-gray-800 rounded-lg shadow-lg p-2 w-56">
              <Collapsible open={isSettingsExpanded} onOpenChange={setIsSettingsExpanded}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer flex flex-row items-center justify-between pb-1 pt-1">
                    <CardTitle className="text-xs font-semibold text-white flex items-center">
                      <Settings className="mr-2 h-3 w-3" />
                      Workflow Settings
                    </CardTitle>
                    {isSettingsExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-2 px-2">
                    <WorkflowSettingsPanel />
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                      <Select value={selectedBackgroundColor} onValueChange={setSelectedBackgroundColor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select background color" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(backgroundColors).map(([name, color]) => (
                            <SelectItem key={color} value={color}>
                              <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                                {name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </Panel>
      </ReactFlow>
      <SaveLoadDialog
        isOpen={showSaveLoadDialog}
        onClose={() => setShowSaveLoadDialog(false)}
        onSave={handleSaveLoad}
        onLoad={(loadedData) => {
          setNodes(loadedData.nodes);
          setEdges(loadedData.edges);
        }}
        graphData={{ nodes, edges }}
      />
      <JSONModal
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
        jsonData={jsonData}
      />
      <AgenticFlowWizard
        isOpen={isAgenticFlowWizardOpen}
        onClose={() => setIsAgenticFlowWizardOpen(false)}
        onCreateFlow={handleCreateAgenticFlow}
      />
    </div>
  );
};

const WorkflowEditor = () => (
  <WorkflowSettingsProvider>
    <WorkflowEditorContent />
  </WorkflowSettingsProvider>
);

export default WorkflowEditor;