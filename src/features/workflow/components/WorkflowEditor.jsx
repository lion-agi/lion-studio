import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowState } from '../../../common/hooks/useWorkflowState';
import { useWorkflowHandlers } from '../../../common/hooks/useWorkflowHandlers';
import { useEdgeHighlighting } from '../../../common/hooks/useEdgeHighlighting';
import { useWorkflowSettings } from './WorkflowSettingsContext';
import NodeCreationPanel from './NodeCreationPanel';
import WorkflowSettingsPanel from './WorkflowSettingsPanel';
import WorkflowToolbar from './WorkflowToolbar';
import { nodeTypes } from './nodeTypes';
import SaveLoadDialog from './SaveLoadDialog';
import JSONModal from './JSONModal';

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
    showSaveLoadDialog,
    setShowSaveLoadDialog,
    showJSONModal,
    setShowJSONModal,
    jsonData,
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const { onNodeClick, edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

  const { backgroundColor, gridSize, snapToGrid } = useWorkflowSettings();

  const styledEdges = useMemo(() => 
    edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
    })),
    [edges, getEdgeStyle]
  );

  return (
    <div className="h-screen w-full relative" ref={reactFlowWrapper}>
      <ReactFlow
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
        snapToGrid={snapToGrid}
        snapGrid={[gridSize, gridSize]}
        fitView
        style={{ backgroundColor }}
      >
        <Background 
          variant="dots" 
          gap={gridSize} 
          size={1} 
          color={backgroundColor === '#1A2530' ? '#2C3E50' : '#1A2530'} 
        />
        <Controls />
        <MiniMap nodeColor={(node) => node.data.color} zoomable pannable />
        <Panel position="top-right" className="bg-background/80 backdrop-blur-sm rounded-lg p-2">
          <WorkflowToolbar 
            onExportJSON={handleExportJSON}
            onSaveLoad={() => setShowSaveLoadDialog(true)}
            onCreateFlow={handleCreateAgenticFlow}
          />
          <WorkflowSettingsPanel />
        </Panel>
      </ReactFlow>
      <NodeCreationPanel onAddNode={(node) => setNodes((nds) => [...nds, node])} />
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

export default WorkflowEditor;