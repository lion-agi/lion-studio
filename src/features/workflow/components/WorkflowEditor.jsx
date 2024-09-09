import React, { useMemo, useRef, useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import SaveLoadDialog from '@/common/components/SaveLoadDialog';
import JSONModal from '@/common/components/JSONModal';
import { nodeTypes } from '@/common/components/nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useWorkflowModals } from '../hooks/useWorkflowModals';
import { useEdgeHighlighting } from '../hooks/useEdgeHighlighting';
import WorkflowToolbar from './WorkflowToolbar';
import { WorkflowSettingsProvider, useWorkflowSettings } from './WorkflowSettingsContext';
import WorkflowSettingsPanel from './WorkflowSettingsPanel';
import NodeCreationCard from './NodeCreationCard';
import SettingsModal from '@/common/components/SettingsModal';

const WorkflowEditorContent = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showSettingsModal, setShowSettingsModal] = useState(false);

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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData,
    setJsonData,
  } = useWorkflowModals();

  const { onNodeClick, edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

  const { backgroundColor, gridSize } = useWorkflowSettings();

  const styledEdges = useMemo(() => 
    edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
    })),
    [edges, getEdgeStyle]
  );

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleOpenSettings = () => {
    setShowSettingsModal(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsModal(false);
  };

  return (
    <div ref={containerRef} className="h-full w-full relative" style={{ height: 'calc(100vh - 64px)' }}>
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        fitView
        style={{
          width: containerSize.width,
          height: containerSize.height,
          backgroundColor: backgroundColor,
        }}
      >
        <Background 
          variant="dots" 
          gap={gridSize} 
          size={1} 
          color="rgba(255, 255, 255, 0.05)" 
          style={{ zIndex: -1 }}
        />
        <Controls 
          style={{
            button: {
              backgroundColor: '#34495E',
              color: '#ECF0F1',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'user': return '#3498DB';
              case 'assistant': return '#F39C12';
              case 'group': return '#E74C3C';
              case 'initializer': return '#9B59B6';
              case 'conversation': return '#1ABC9C';
              case 'note': return '#34495E';
              default: return '#95A5A6';
            }
          }}
          nodeStrokeWidth={3} 
          zoomable 
          pannable
          style={{
            backgroundColor: '#34495E',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Panel position="top-left">
          <NodeCreationCard
            onAddNode={(type) => {/* Implement add node logic */}}
            onSave={handleSaveLoad}
            onLoad={() => setShowSaveLoadDialog(true)}
            onExportJSON={handleExportJSON}
            onCreateFlow={handleCreateAgenticFlow}
            onOpenSettings={handleOpenSettings}
          />
        </Panel>
        <Panel position="top-right">
          <WorkflowToolbar
            onExportJSON={handleExportJSON}
            onSaveLoad={() => setShowSaveLoadDialog(true)}
            onCreateFlow={handleCreateAgenticFlow}
            onOpenSettings={handleOpenSettings}
          />
        </Panel>
        <Panel position="bottom-right">
          <WorkflowSettingsPanel />
        </Panel>
      </ReactFlow>
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
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={handleCloseSettings}
      />
    </div>
  );
};

const WorkflowEditor = () => (
  <WorkflowSettingsProvider>
    <WorkflowEditorContent />
  </WorkflowSettingsProvider>
);

export default WorkflowEditor;