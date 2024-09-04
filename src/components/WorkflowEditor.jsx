import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges, reactFlowInstance);

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