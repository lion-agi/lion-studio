import React, { useState, useCallback, useRef, useEffect } from 'react';
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
import { useNodes, useAddNode, useUpdateNode, useDeleteNode } from '../integrations/supabase/hooks/nodes';
import { useSupabaseAuth } from '../integrations/supabase';

const GRID_SIZE = 20;

const snapToGrid = (x, y) => ({
  x: Math.round(x / GRID_SIZE) * GRID_SIZE,
  y: Math.round(y / GRID_SIZE) * GRID_SIZE,
});

const WorkflowEditor = () => {
  const { session } = useSupabaseAuth();
  const { data: nodesData, isLoading: isLoadingNodes } = useNodes(session?.user?.id);
  const addNodeMutation = useAddNode();
  const updateNodeMutation = useUpdateNode();
  const deleteNodeMutation = useDeleteNode();

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges,
  } = useWorkflowState();

  useEffect(() => {
    if (nodesData) {
      setNodes(nodesData.map(node => ({
        ...node,
        position: { x: node.position_x, y: node.position_y },
      })));
    }
  }, [nodesData, setNodes]);

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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges, updateNodeMutation, deleteNodeMutation);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData,
    setJsonData,
  } = useWorkflowModals();

  const [activeFeature, setActiveFeature] = useState('workflows');
  const [isSecondaryNavExpanded, setIsSecondaryNavExpanded] = useState(true);

  const handleFeatureChange = useCallback((feature) => {
    setActiveFeature(feature);
    setIsSecondaryNavExpanded(true);
  }, []);

  const customEdgeOptions = {
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { strokeWidth: 2, stroke: '#6366F1' },
  };

  const handleJSONExport = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setJsonData(flow);
      setShowJSONModal(true);
    }
  }, [reactFlowInstance, setJsonData, setShowJSONModal]);

  const onAddNode = useCallback((nodeData) => {
    const position = { x: Math.random() * 500, y: Math.random() * 500 };
    const newNode = {
      id: `${nodeData.type}-${Date.now()}`,
      type: nodeData.type,
      position,
      data: { label: nodeData.name, ...nodeData },
    };
    addNodeMutation.mutate({
      user_id: session.user.id,
      type: newNode.type,
      label: newNode.data.label,
      position_x: newNode.position.x,
      position_y: newNode.position.y,
      data: newNode.data,
    });
    setNodes((nds) => [...nds, newNode]);
  }, [addNodeMutation, session, setNodes]);

  if (isLoadingNodes) {
    return <div>Loading workflow...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar
          onExportJSON={handleJSONExport}
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
              <MiniMap nodeColor={getNodeColor} nodeStrokeWidth={3} zoomable pannable />
            </ReactFlow>
          </div>
          <NodeCreationCard onAddNode={onAddNode} />
        </div>
      </div>
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

const getNodeColor = (node) => {
  switch (node.type) {
    case 'user': return '#3B82F6';
    case 'agent': return '#10B981';
    case 'assistant': return '#F59E0B';
    case 'group': return '#FF4136';
    case 'initializer': return '#EF4444';
    case 'conversation': return '#EC4899';
    case 'note': return '#6366F1';
    default: return '#64748B';
  }
};

export default WorkflowEditor;