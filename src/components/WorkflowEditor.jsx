import React, { useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import ConsoleHeader from './header/ConsoleHeader';
import ConsolePageHeader from './header/ConsolePageHeader';
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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData,
    setJsonData,
  } = useWorkflowModals();

  const [activeView, setActiveView] = useState('main');

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

  const renderMainContent = () => {
    switch (activeView) {
      case 'main':
        return (
          <div className="flex-grow flex" style={{ height: 'calc(100vh - 180px)' }}>
            <div className="flex-grow relative" ref={reactFlowWrapper}>
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
            <NodeCreationCard onAddNode={(nodeData) => setNodes((nds) => [...nds, createNode(nodeData)])} />
          </div>
        );
      case 'settings':
        return <div className="flex-grow p-4">Workflow Settings (Placeholder)</div>;
      case 'help':
        return <div className="flex-grow p-4">Workflow Help Documentation (Placeholder)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ConsoleHeader />
      <ConsolePageHeader 
        title="Workflow Editor"
        activeView={activeView}
        onViewChange={setActiveView}
        onExportJSON={handleJSONExport}
        onSaveLoad={() => setShowSaveLoadDialog(true)}
        onCreateNew={handleCreateAgenticFlow}
      />
      <main className="flex-grow overflow-hidden">
        {renderMainContent()}
      </main>
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

const createNode = (nodeData) => ({
  id: `${nodeData.type}-${Date.now()}`,
  type: nodeData.type,
  position: { x: Math.random() * 500, y: Math.random() * 500 },
  data: { label: nodeData.name, ...nodeData },
});

export default WorkflowEditor;