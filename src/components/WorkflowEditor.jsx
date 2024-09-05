import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import EditorSidebar from './EditorSidebar';
import NodeCreationPanel from './NodeCreationPanel';
import SaveLoadDialog from './SaveLoadDialog';
import JSONModal from './JSONModal';
import { nodeTypes } from './nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useWorkflowModals } from '../hooks/useWorkflowModals';

const GRID_SIZE = 20;

const snapToGrid = (x, y) => ({
  x: Math.round(x / GRID_SIZE) * GRID_SIZE,
  y: Math.round(y / GRID_SIZE) * GRID_SIZE,
});

const WorkflowEditor = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setReactFlowInstance
  } = useWorkflowState();

  const reactFlowWrapper = useRef(null);

  const {
    onConnect,
    handleAddNode,
    handleDragOver,
    handleDrop,
    handleSaveLoad,
    handleCreateAgenticFlow,
    handleNodeClick,
    handleNodeDragStop,
    handleExportJSON
  } = useWorkflowHandlers(reactFlowWrapper);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData
  } = useWorkflowModals();

  const customEdgeOptions = {
    type: 'smoothstep',
    markerEnd: { type: 'arrowclosed' },
    style: { strokeWidth: 2, stroke: '#6366F1' },
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex flex-grow overflow-hidden">
        <EditorSidebar
          onExportJSON={handleExportJSON}
          onSaveLoad={() => setShowSaveLoadDialog(true)}
          onCreateAgenticFlow={handleCreateAgenticFlow}
        />
        <div className="flex-grow flex relative">
          <div className="flex-grow" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onNodeClick={handleNodeClick}
              onNodeDragStop={handleNodeDragStop}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={customEdgeOptions}
              snapToGrid={true}
              snapGrid={[GRID_SIZE, GRID_SIZE]}
              fitView
            >
              <Background variant="dots" gap={GRID_SIZE} size={1} color="#4B5563" />
              <Controls />
              <MiniMap
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'user': return '#3B82F6';
                    case 'agent': return '#10B981';
                    case 'assistant': return '#F59E0B';
                    case 'group': return '#FF4136';
                    case 'initializer': return '#EF4444';
                    case 'nestedChat': return '#EC4899';
                    case 'note': return '#6366F1';
                    default: return '#64748B';
                  }
                }}
                nodeStrokeWidth={3}
                zoomable
                pannable
              />
            </ReactFlow>
          </div>
          <NodeCreationPanel onAddNode={handleAddNode} />
        </div>
      </div>
      {showSaveLoadDialog && (
        <SaveLoadDialog
          isOpen={showSaveLoadDialog}
          onClose={() => setShowSaveLoadDialog(false)}
          onSave={handleSaveLoad}
          onLoad={handleSaveLoad}
          graphData={{ nodes, edges }}
        />
      )}
      {showJSONModal && (
        <JSONModal
          isOpen={showJSONModal}
          onClose={() => setShowJSONModal(false)}
          jsonData={jsonData}
        />
      )}
    </div>
  );
};

export default WorkflowEditor;