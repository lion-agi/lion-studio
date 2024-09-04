import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import LeftSidebar from './LeftSidebar';
import { nodeTypes } from './nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useWorkflowModals } from '../hooks/useWorkflowModals';

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    sidebarExpanded,
    expandedCategories,
    setSidebarExpanded,
    setExpandedCategories,
  } = useWorkflowState();

  const {
    onConnect,
    addNode,
    toggleSidebar,
    toggleCategory,
    onDragOver,
    onDrop,
    handleExportJSON,
    handleSaveLoad,
    handleCreateAgenticFlow,
    handleOpenNodeWizard,
    onNodeClick,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges, reactFlowInstance, sidebarExpanded, setSidebarExpanded);

  const {
    showHelpOverlay,
    showSettingsModal,
    showJSONModal,
    showSaveLoadDialog,
    showNodeWizard,
    nodeWizardType,
    setShowHelpOverlay,
    setShowSettingsModal,
    setShowJSONModal,
    setShowSaveLoadDialog,
    setShowNodeWizard,
    setNodeWizardType,
  } = useWorkflowModals();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar
          onExportJSON={handleExportJSON}
          onSaveLoad={handleSaveLoad}
          onCreateAgenticFlow={handleCreateAgenticFlow}
          onShowHelp={() => setShowHelpOverlay(true)}
          onShowSettings={() => setShowSettingsModal(true)}
        />
        <div className="flex-grow flex">
          <Sidebar onAddNode={addNode} />
          <div className="flex-grow">
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
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <MiniMap nodeColor={(node) => {
                switch (node.type) {
                  case 'user': return '#3B82F6';
                  case 'agent': return '#10B981';
                  case 'assistant': return '#F59E0B';
                  case 'group': return '#8B5CF6';
                  case 'initializer': return '#EF4444';
                  case 'nestedChat': return '#EC4899';
                  case 'note': return '#6366F1';
                  default: return '#64748B';
                }
              }} nodeStrokeWidth={3} zoomable pannable />
              <Background color="#4B5563" gap={16} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;