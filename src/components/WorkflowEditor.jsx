import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import HelpOverlay from './HelpOverlay';
import SettingsModal from './SettingsModal';
import JSONModal from './JSONModal';
import SaveLoadDialog from './SaveLoadDialog';
import AgenticFlowWizard from './AgenticFlowWizard';
import WizardDialog from './WizardDialog';
import { nodeTypes } from './nodes';

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showHelpOverlay, setShowHelpOverlay] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [showNodeWizard, setShowNodeWizard] = useState(false);
  const [nodeWizardType, setNodeWizardType] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    basic: true,
    advanced: false,
    extensions: false,
  });
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366F1', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' },
    }, eds));
  }, [setEdges]);

  const addNode = useCallback((nodeData) => {
    const newNode = {
      id: `${nodeData.type}-${nodes.length + 1}`,
      type: nodeData.type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: nodeData.name, ...nodeData },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, reactFlowInstance]
  );

  const handleExportJSON = () => {
    const graphData = { nodes, edges };
    setShowJSONModal(true);
  };

  const handleSaveLoad = () => {
    setShowSaveLoadDialog(true);
  };

  const handleCreateAgenticFlow = (flowConfig) => {
    console.log('Creating new flow:', flowConfig);
    // Implement the logic to create a new flow based on the configuration
  };

  const handleOpenNodeWizard = (nodeType) => {
    setNodeWizardType(nodeType);
    setShowNodeWizard(true);
  };

  const onNodeClick = useCallback((event, node) => {
    // Deselect all nodes
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, [setNodes]);

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
        expandedCategories={expandedCategories}
        toggleCategory={toggleCategory}
        onHelpClick={() => setShowHelpOverlay(true)}
        onSettingsClick={() => setShowSettingsModal(true)}
        onExportJSONClick={handleExportJSON}
        onSaveLoadClick={handleSaveLoad}
        onCreateAgenticFlow={handleCreateAgenticFlow}
        onOpenNodeWizard={handleOpenNodeWizard}
      />

      <div className={`flex-grow transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`} ref={reactFlowWrapper}>
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
              case 'user':
                return '#3B82F6';
              case 'agent':
                return '#10B981';
              case 'assistant':
                return '#F59E0B';
              case 'group':
                return '#8B5CF6';
              case 'initializer':
                return '#EF4444';
              case 'nestedChat':
                return '#EC4899';
              case 'note':
                return '#6366F1';
              default:
                return '#64748B';
            }
          }} nodeStrokeWidth={3} zoomable pannable />
          <Background color="#4B5563" gap={16} />
        </ReactFlow>
      </div>

      {showHelpOverlay && <HelpOverlay onClose={() => setShowHelpOverlay(false)} />}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
      {showJSONModal && <JSONModal isOpen={showJSONModal} onClose={() => setShowJSONModal(false)} jsonData={{ nodes, edges }} />}
      {showSaveLoadDialog && (
        <SaveLoadDialog
          isOpen={showSaveLoadDialog}
          onClose={() => setShowSaveLoadDialog(false)}
          onSave={(savedGraph) => {
            console.log('Saving graph:', savedGraph);
            setShowSaveLoadDialog(false);
          }}
          onLoad={(loadedGraphData) => {
            setNodes(loadedGraphData.nodes);
            setEdges(loadedGraphData.edges);
            setShowSaveLoadDialog(false);
          }}
          graphData={{ nodes, edges }}
        />
      )}
      {showNodeWizard && (
        <WizardDialog
          isOpen={showNodeWizard}
          onClose={() => setShowNodeWizard(false)}
          onAddNode={addNode}
          nodeType={nodeWizardType}
        />
      )}
    </div>
  );
};

export default WorkflowEditor;