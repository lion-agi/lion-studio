import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import LeftSidebar from './LeftSidebar';
import SecondaryNavigation from './SecondaryNavigation';
import NodeCreationCard from './NodeCreationCard';
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
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [jsonData, setJsonData] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activeFeature, setActiveFeature] = useState('workflows');
  const [isSecondaryNavExpanded, setIsSecondaryNavExpanded] = useState(true);

  const { sidebarExpanded, setSidebarExpanded } = useWorkflowState();

  const {
    onConnect,
    addNode,
    onDragOver,
    onDrop,
    handleSaveLoad,
    handleCreateAgenticFlow,
    onNodeClick,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges, reactFlowWrapper, reactFlowInstance, sidebarExpanded, setSidebarExpanded);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
  } = useWorkflowModals();

  const handleFeatureChange = useCallback((feature) => {
    setActiveFeature(feature);
    setIsSecondaryNavExpanded(true);
  }, []);

  const handleExportJSON = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setJsonData(flow);
      setShowJSONModal(true);
    }
  }, [reactFlowInstance, setShowJSONModal]);

  const onNodeDragStop = useCallback((event, node) => {
    if (node && node.position) {
      const { x, y } = snapToGrid(node.position.x, node.position.y);
      setNodes((nds) =>
        nds.map((n) => (n.id === node.id ? { ...n, position: { x, y } } : n))
      );
    }
  }, [setNodes]);

  const customEdgeOptions = {
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2, stroke: '#6366F1' },
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar
          onExportJSON={handleExportJSON}
          onSaveLoad={() => setShowSaveLoadDialog(true)}
          onCreateAgenticFlow={handleCreateAgenticFlow}
          onFeatureChange={handleFeatureChange}
        />
        <SecondaryNavigation
          activeFeature={activeFeature}
          isExpanded={isSecondaryNavExpanded}
          toggleExpanded={() => setIsSecondaryNavExpanded(!isSecondaryNavExpanded)}
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
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onNodeDragStop={onNodeDragStop}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={customEdgeOptions}
              snapToGrid={true}
              snapGrid={[GRID_SIZE, GRID_SIZE]}
              fitView
            >
              <Background variant="dots" gap={GRID_SIZE} size={1} color="#4B5563" />
              <Controls />
              <MiniMap nodeColor={(node) => {
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
              }} nodeStrokeWidth={3} zoomable pannable />
            </ReactFlow>
          </div>
          <NodeCreationCard onAddNode={addNode} />
        </div>
      </div>
      {showSaveLoadDialog && (
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