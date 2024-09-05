import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
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

const GRID_SIZE = 20; // Size of each grid cell

const snapToGrid = (x, y) => {
  return {
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  };
};

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activeFeature, setActiveFeature] = useState('workflows');
  const [isSecondaryNavExpanded, setIsSecondaryNavExpanded] = useState(true);
  const [workflowData, setWorkflowData] = useState({});

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
    updateWorkflowData();
  }, [setNodes]);

  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    updateWorkflowData();
  }, [setNodes, setEdges]);

  const handleAddNode = useCallback((nodeData) => {
    const position = snapToGrid(Math.random() * 500, Math.random() * 500);
    const newNode = {
      id: `${nodeData.type}-${nodes.length + 1}`,
      type: nodeData.type,
      position,
      data: { 
        ...nodeData,
        onSave: handleSaveNode,
        onDelete: handleDeleteNode
      },
    };
    setNodes((nds) => nds.concat(newNode));
    updateWorkflowData();
  }, [nodes, setNodes, handleSaveNode, handleDeleteNode]);

  const updateWorkflowData = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      setWorkflowData(flow);
    }
  }, [reactFlowInstance]);

  const handleExportJSON = useCallback(() => {
    return workflowData;
  }, [workflowData]);

  const onNodeDragStop = useCallback((event, node) => {
    const { x, y } = snapToGrid(node.position.x, node.position.y);
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return { ...n, position: { x, y } };
        }
        return n;
      })
    );
  }, [setNodes]);

  const customEdgeOptions = {
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: {
      strokeWidth: 2,
      stroke: '#6366F1',
    },
  };

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
              onConnect={(params) => onConnect({ ...params, ...customEdgeOptions })}
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
              <Background
                variant="dots"
                gap={GRID_SIZE}
                size={1}
                color="#4B5563"
              />
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
            setWorkflowData(loadedData);
          }}
          graphData={workflowData}
        />
      )}
    </div>
  );
};

export default WorkflowEditor;