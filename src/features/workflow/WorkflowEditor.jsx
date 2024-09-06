import React from 'react';
import PropTypes from 'prop-types';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import WorkflowToolbar from './WorkflowToolbar';
import NodeCreationPanel from './NodeCreationPanel';

const WorkflowEditor = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDrop,
  onDragOver,
  onNodeClick,
  onNodeDragStop,
  nodeTypes,
  edgeOptions,
  onExportJSON,
  onSaveLoad,
  onCreateFlow,
  onAddNode,
}) => (
  <div className="h-full w-full relative">
    <ReactFlow
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
      defaultEdgeOptions={edgeOptions}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
    <WorkflowToolbar
      onExportJSON={onExportJSON}
      onSaveLoad={onSaveLoad}
      onCreateFlow={onCreateFlow}
    />
    <NodeCreationPanel onAddNode={onAddNode} />
  </div>
);

WorkflowEditor.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  onNodesChange: PropTypes.func.isRequired,
  onEdgesChange: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  onNodeDragStop: PropTypes.func.isRequired,
  nodeTypes: PropTypes.object.isRequired,
  edgeOptions: PropTypes.object.isRequired,
  onExportJSON: PropTypes.func.isRequired,
  onSaveLoad: PropTypes.func.isRequired,
  onCreateFlow: PropTypes.func.isRequired,
  onAddNode: PropTypes.func.isRequired,
};

export default WorkflowEditor;