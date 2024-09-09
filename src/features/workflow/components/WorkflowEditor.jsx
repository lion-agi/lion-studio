import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Panel, 
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@/common/components/nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useEdgeHighlighting } from '../hooks/useEdgeHighlighting';
import { WorkflowSettingsProvider, useWorkflowSettings } from './WorkflowSettingsContext';
import WorkflowOperationsPanel from './WorkflowOperationsPanel';
import NodeCreationPanel from './NodeCreationPanel';
import AgenticFlowWizard from '@/common/components/AgenticFlowWizard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import EdgePropertiesDialog from './EdgePropertiesDialog';

const WorkflowEditorContent = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isLocked, setIsLocked] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isEdgePropertiesDialogOpen, setIsEdgePropertiesDialogOpen] = useState(false);

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
    undo,
    redo,
    canUndo,
    canRedo,
    handleDeleteNode,
    handleSaveSettings,
    isWizardOpen,
    setIsWizardOpen,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const { edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

  const { backgroundColor } = useWorkflowSettings();

  const { zoomIn, zoomOut, fitView } = useReactFlow();

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
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerSize({
          width: offsetWidth,
          height: offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setIsEdgePropertiesDialogOpen(true);
  }, []);

  const handleEdgePropertiesSave = useCallback((updatedEdge) => {
    setEdges(eds => eds.map(e => e.id === updatedEdge.id ? updatedEdge : e));
    setIsEdgePropertiesDialogOpen(false);
    setSelectedEdge(null);
  }, [setEdges]);

  return (
    <div ref={containerRef} className="h-full w-full relative flex" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="w-72 bg-gray-800 p-4 overflow-y-auto flex flex-col" style={{ maxHeight: 'calc(100vh - 64px)' }}>
        <NodeCreationPanel />
        <WorkflowOperationsPanel
          onExportJSON={handleExportJSON}
          onSaveLoad={handleSaveLoad}
          onCreateAgenticFlow={handleCreateAgenticFlow}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onDeleteNode={handleDeleteNode}
          onSaveSettings={handleSaveSettings}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetView={fitView}
          onEdgeClick={onEdgeClick}
        />
      </div>
      <div className="flex-grow">
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
          onEdgeClick={onEdgeClick}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={edgeOptions}
          fitView
          style={{
            backgroundColor: backgroundColor,
          }}
          panOnDrag={!isLocked}
          zoomOnScroll={!isLocked}
          nodesDraggable={!isLocked}
          nodesConnectable={!isLocked}
          elementsSelectable={!isLocked}
        >
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'user': return '#22c55e';
                case 'assistant': return '#CD7F32';
                case 'group': return '#FF4136';
                case 'initializer': return '#ec4899';
                case 'conversation': return '#1ABC9C';
                case 'note': return '#f97316';
                default: return '#6366f1';
              }
            }}
            nodeStrokeWidth={3} 
            zoomable 
            pannable
          />
        </ReactFlow>
      </div>
      <AgenticFlowWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateFlow={(flowConfig) => {
          console.log('Creating new flow:', flowConfig);
          setIsWizardOpen(false);
        }}
      />
      <EdgePropertiesDialog
        isOpen={isEdgePropertiesDialogOpen}
        onClose={() => setIsEdgePropertiesDialogOpen(false)}
        edge={selectedEdge}
        onSave={handleEdgePropertiesSave}
      />
    </div>
  );
};

const WorkflowEditor = () => (
  <ReactFlowProvider>
    <WorkflowSettingsProvider>
      <WorkflowEditorContent />
    </WorkflowSettingsProvider>
  </ReactFlowProvider>
);

export default WorkflowEditor;


// Path: src/features/workflow/components/WorkflowEditor.jsx