import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
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
        onEdgeClick={onEdgeClick}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        fitView
        style={{
          width: containerSize.width,
          height: containerSize.height,
          backgroundColor: backgroundColor,
        }}
        panOnDrag={!isLocked}
        zoomOnScroll={!isLocked}
        nodesDraggable={!isLocked}
        nodesConnectable={!isLocked}
        elementsSelectable={!isLocked}
      >
        <Controls />
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
        />
        <Panel position="top-left">
          <div className="space-y-2">
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
        </Panel>
      </ReactFlow>
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