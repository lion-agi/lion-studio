import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel } from 'reactflow';
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

const WorkflowEditorContent = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

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
        fitView
        style={{
          width: containerSize.width,
          height: containerSize.height,
          backgroundColor: backgroundColor,
        }}
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
            />
          </div>
        </Panel>
      </ReactFlow>
      <AgenticFlowWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateFlow={(flowConfig) => {
          // Implement the logic to create a new flow based on the configuration
          console.log('Creating new flow:', flowConfig);
          setIsWizardOpen(false);
        }}
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