import React, { useMemo, useRef, useState, useEffect } from 'react';
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
import { ChevronDown, ChevronUp, Save, Upload, PlusCircle, FileJson, Settings } from 'lucide-react';
import WorkflowSettingsPanel from './WorkflowSettingsPanel';
import NodeCreationPanel from './NodeCreationPanel';

const WorkflowEditorContent = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);
  const [isToolsExpanded, setIsToolsExpanded] = useState(true);

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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData,
    setJsonData,
  } = useWorkflowModals();

  const { onNodeClick, edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

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
  const toggleTools = () => setIsToolsExpanded(!isToolsExpanded);

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
          backgroundColor: backgroundColor,
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
          <Card className="bg-gray-800 rounded-lg shadow-lg p-2 mb-2 w-56">
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
                  <div className="flex flex-col space-y-1 mt-2">
                    <Button onClick={handleExportJSON} size="sm" className="w-full text-xs py-1 h-7">
                      <FileJson className="mr-1 h-3 w-3" />
                      Export JSON
                    </Button>
                    <Button onClick={() => setShowSaveLoadDialog(true)} size="sm" className="w-full text-xs py-1 h-7">
                      <Save className="mr-1 h-3 w-3" />
                      Save/Load
                    </Button>
                    <Button onClick={handleCreateAgenticFlow} size="sm" className="w-full text-xs py-1 h-7">
                      <PlusCircle className="mr-1 h-3 w-3" />
                      Create Flow
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
          <Card className="bg-gray-800 rounded-lg shadow-lg p-2 w-56">
            <Collapsible open={isToolsExpanded} onOpenChange={setIsToolsExpanded}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer flex flex-row items-center justify-between pb-1 pt-1">
                  <CardTitle className="text-xs font-semibold text-white flex items-center">
                    <PlusCircle className="mr-2 h-3 w-3" />
                    Workflow Tools
                  </CardTitle>
                  {isToolsExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-2 px-2">
                  <NodeCreationPanel />
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
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
    </div>
  );
};

const WorkflowEditor = () => (
  <WorkflowSettingsProvider>
    <WorkflowEditorContent />
  </WorkflowSettingsProvider>
);

export default WorkflowEditor;