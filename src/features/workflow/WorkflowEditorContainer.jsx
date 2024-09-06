import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowState } from './useWorkflowState';
import { useWorkflowHandlers } from '../../common/hooks/useWorkflowHandlers';
import { useEdgeHighlighting } from '../../common/hooks/useEdgeHighlighting';
import WorkflowToolbar from './WorkflowToolbar';
import NodeCreationPanel from './NodeCreationPanel';
import { nodeTypes } from '../nodeTypes';
import WorkflowEditor from './WorkflowEditor';

const WorkflowEditorContainer = () => {
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
    handleExportJSON,
    handleSaveLoad,
    handleCreateAgenticFlow,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const { onNodeClick, edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

  return (
    <WorkflowEditor
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onNodeClick={onNodeClick}
      onNodeDragStop={onNodeDragStop}
      nodeTypes={nodeTypes}
      edgeOptions={edgeOptions}
      onExportJSON={handleExportJSON}
      onSaveLoad={handleSaveLoad}
      onCreateFlow={handleCreateAgenticFlow}
      onAddNode={(nodeData) => setNodes((nds) => [...nds, nodeData])}
    />
  );
};

export default WorkflowEditorContainer;