import React, { useMemo, useRef, useState, useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Panel, 
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@/common/components/nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useEdgeHighlighting } from '../hooks/useEdgeHighlighting';
import { WorkflowSettingsProvider, useWorkflowSettings } from './WorkflowSettingsContext';
import WorkflowOperationsPanel from './WorkflowOperationsPanel';
import NodeCreationPanel from './NodeCreationPanel';
import AgenticFlowWizard from '@/common/components/AgenticFlowWizard';
import EdgePropertiesDialog from './EdgePropertiesDialog';
import JSONModal from '@/common/components/JSONModal';
import SaveLoadDialog from '@/common/components/SaveLoadDialog';
import { useToast } from "@/common/components/ui/use-toast";

const WorkflowEditorContent = () => {
  const containerRef = useRef(null);
  const [isGraphLocked, setIsGraphLocked] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isEdgePropertiesDialogOpen, setIsEdgePropertiesDialogOpen] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [savedGraphs, setSavedGraphs] = useState([]);
  const { toast } = useToast();

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
    handleCreateAgenticFlow,
    undo,
    redo,
    canUndo,
    canRedo,
    handleSaveSettings,
    isWizardOpen,
    setIsWizardOpen,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const { edgeOptions, getEdgeStyle, onNodeClick } = useEdgeHighlighting(edges, setEdges);

  const { backgroundColor } = useWorkflowSettings();

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const styledEdges = useMemo(() => 
    edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
    })),
    [edges, getEdgeStyle]
  );

  const onEdgeClick = useCallback((event, edge) => {
    setSelectedEdge(edge);
    setIsEdgePropertiesDialogOpen(true);
  }, []);

  const handleEdgePropertiesSave = useCallback((updatedEdge) => {
    setEdges(eds => eds.map(e => e.id === updatedEdge.id ? updatedEdge : e));
    setIsEdgePropertiesDialogOpen(false);
    setSelectedEdge(null);
  }, [setEdges]);

  const handleShowJSONModal = useCallback(() => {
    const jsonContent = handleExportJSON();
    setJsonData(jsonContent);
    setShowJSONModal(true);
  }, [handleExportJSON]);

  const handleToggleGraphLock = useCallback(() => {
    setIsGraphLocked(prev => !prev);
  }, []);

  const modifiedOnDrop = useCallback(
    (event) => {
      if (!isGraphLocked) {
        onDrop(event);
      }
    },
    [isGraphLocked, onDrop]
  );

  const handleSave = useCallback(() => {
    const flowData = reactFlowInstance.toObject();
    setSavedGraphs(prev => [...prev, flowData]);
    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved to the current session.",
    });
  }, [reactFlowInstance, toast]);

  const handleLoad = useCallback((loadedGraph) => {
    if (loadedGraph && loadedGraph.nodes && loadedGraph.edges) {
      setNodes(loadedGraph.nodes);
      setEdges(loadedGraph.edges);
      toast({
        title: "Workflow Loaded",
        description: "Your workflow has been loaded successfully.",
      });
    }
  }, [setNodes, setEdges, toast]);

  const handleDownload = useCallback(() => {
    const flowData = reactFlowInstance.toObject();
    const dataStr = JSON.stringify(flowData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'workflow.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [reactFlowInstance]);

  return (
    <div ref={containerRef} className="h-full w-full relative flex" style={{ height: 'calc(100vh - 64px)' }}>
      <div className="w-72 bg-gray-800 p-4 overflow-y-auto flex flex-col" style={{ maxHeight: 'calc(100vh - 64px)' }}>
        <NodeCreationPanel />
        <WorkflowOperationsPanel
          onExportJSON={handleExportJSON}
          onSaveLoad={() => setShowSaveLoadDialog(true)}
          onCreateAgenticFlow={handleCreateAgenticFlow}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          onSaveSettings={handleSaveSettings}
          isGraphLocked={isGraphLocked}
          onToggleGraphLock={handleToggleGraphLock}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetView={fitView}
          onEdgeClick={onEdgeClick}
          onShowJSONModal={handleShowJSONModal}
          onSave={handleSave}
          onDownload={handleDownload}
        />
      </div>
      <div className="flex-grow">
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={styledEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={modifiedOnDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={edgeOptions}
          fitView
          style={{
            backgroundColor: backgroundColor,
          }}
          panOnDrag={!isGraphLocked}
          zoomOnScroll={!isGraphLocked}
          nodesDraggable={!isGraphLocked}
          nodesConnectable={!isGraphLocked}
          elementsSelectable={!isGraphLocked}
        >
          <MiniMap 
            nodeColor={(node) => {
              switch (node.type) {
                case 'user': return '#22c55e';
                case 'assistant': return '#CD7F32';
                case 'group': return '#FF4136';
                case 'initializer': return '#ec4899';
                case 'conversation': return '#1ABC9C';
                case 'note': return '#f97316';
                default: return '#6366f1';
              }
            }}
            nodeStrokeWidth={3} 
            zoomable 
            pannable
          />
        </ReactFlow>
      </div>
      <AgenticFlowWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateFlow={(flowConfig) => {
          console.log('Creating new flow:', flowConfig);
          setIsWizardOpen(false);
        }}
      />
      <EdgePropertiesDialog
        isOpen={isEdgePropertiesDialogOpen}
        onClose={() => setIsEdgePropertiesDialogOpen(false)}
        edge={selectedEdge}
        onSave={handleEdgePropertiesSave}
      />
      <JSONModal
        isOpen={showJSONModal}
        onClose={() => setShowJSONModal(false)}
        jsonData={jsonData}
      />
      <SaveLoadDialog
        isOpen={showSaveLoadDialog}
        onClose={() => setShowSaveLoadDialog(false)}
        onSave={handleSave}
        onLoad={handleLoad}
        graphData={{ nodes, edges }}
        savedGraphs={savedGraphs}
      />
    </div>
  );
};

const WorkflowEditor = () => (
  <ReactFlowProvider>
    <WorkflowSettingsProvider>
      <WorkflowEditorContent />
    </WorkflowSettingsProvider>
  </ReactFlowProvider>
);

export default WorkflowEditor;