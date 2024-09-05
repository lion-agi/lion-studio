import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import LeftSidebar from './LeftSidebar';
import SecondaryNavigation from './SecondaryNavigation';
import NodeCreationCard from './NodeCreationCard';
import SaveLoadDialog from './SaveLoadDialog';
import { nodeTypes } from './nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useWorkflowModals } from '../hooks/useWorkflowModals';

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activeFeature, setActiveFeature] = useState('workflows');
  const [isSecondaryNavExpanded, setIsSecondaryNavExpanded] = useState(true);

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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges, reactFlowWrapper, reactFlowInstance, sidebarExpanded, setSidebarExpanded);

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

  const handleFeatureChange = (feature) => {
    setActiveFeature(feature);
    setIsSecondaryNavExpanded(true);
  };

  const handleSaveNode = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData, onSave: handleSaveNode, onDelete: handleDeleteNode } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    
    // Update the JSON representation
    if (reactFlowInstance) {
      const updatedFlow = reactFlowInstance.toObject();
      updatedFlow.nodes = updatedFlow.nodes.filter((node) => node.id !== nodeId);
      updatedFlow.edges = updatedFlow.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
      // You might want to save this updated flow or update your state here
    }
  }, [setNodes, setEdges, reactFlowInstance]);

  const handleAddNode = useCallback((nodeData) => {
    const newNode = {
      id: `${nodeData.type}-${nodes.length + 1}`,
      type: nodeData.type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { 
        ...nodeData,
        onSave: handleSaveNode,
        onDelete: handleDeleteNode
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes, handleSaveNode, handleDeleteNode]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar
          onExportJSON={handleExportJSON}
          onSaveLoad={() => setShowSaveLoadDialog(true)}
          onCreateAgenticFlow={handleCreateAgenticFlow}
          onShowHelp={() => setShowHelpOverlay(true)}
          onShowSettings={() => setShowSettingsModal(true)}
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
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <MiniMap
                nodeColor={(node) => {
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
                }}
                nodeStrokeWidth={3}
                zoomable
                pannable
              />
              <Background color="#4B5563" gap={16} />
            </ReactFlow>
          </div>
          <NodeCreationCard onAddNode={handleAddNode} />
        </div>
      </div>
      {showSaveLoadDialog && (
        <SaveLoadDialog
          isOpen={showSaveLoadDialog}
          onClose={() => setShowSaveLoadDialog(false)}
          onSave={handleSaveLoad}
          onLoad={(loadedData) => {
            setNodes(loadedData.nodes.map(node => ({
              ...node,
              data: {
                ...node.data,
                onSave: handleSaveNode,
                onDelete: handleDeleteNode
              }
            })));
            setEdges(loadedData.edges);
          }}
          graphData={{ nodes, edges }}
        />
      )}
    </div>
  );
};

export default WorkflowEditor;