import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowState } from './useWorkflowState';
import { useWorkflowHandlers } from './useWorkflowHandlers';
import { useEdgeHighlighting } from './useEdgeHighlighting';
import { useWorkflowSettings } from './WorkflowSettingsContext1';
import NodeCreationPanel from './NodeCreationPanel1';
import WorkflowSettingsPanel from './WorkflowSettingsPanel1';
import { nodeTypes } from './nodeTypes';
import { createNode } from './nodeUtils';

const WorkflowEditor = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges,
  } = useWorkflowState();

  const {
    onConnect,
    onDragOver,
    onDrop,
    onNodeDragStop,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const { onNodeClick, edgeOptions, styledEdges } = useEdgeHighlighting(edges, setEdges);

  const { backgroundColor, gridSize, snapToGrid } = useWorkflowSettings();

  return (
    <div className="h-screen w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        snapToGrid={snapToGrid}
        snapGrid={[gridSize, gridSize]}
        fitView
        style={{ backgroundColor }}
      >
        <Background gap={gridSize} size={1} color={backgroundColor === '#1A2530' ? '#2C3E50' : '#1A2530'} />
        <Controls />
        <MiniMap nodeColor={(node) => node.data.color} zoomable pannable />
      </ReactFlow>
      <NodeCreationPanel onAddNode={(nodeData) => setNodes((nds) => [...nds, createNode(nodeData)])} />
      <div className="absolute top-4 right-4">
        <WorkflowSettingsPanel />
      </div>
    </div>
  );
};

export default WorkflowEditor;