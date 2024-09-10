import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from "@/common/components/ui/button";
import WizardDialog from './WizardDialog';
import NodeSettingsDialog from './NodeSettingsDialog';
import SaveLoadDialog from './SaveLoadDialog';
import AgenticFlowWizard from './AgenticFlowWizard';
import { useModelCallDiagramState } from '../hooks/useModelCallDiagramState';
import { useModelCallDiagramHandlers } from '../hooks/useModelCallDiagramHandlers';

const ModelCallDiagram = ({ onExportJson }) => {
  const {
    nodes,
    edges,
    selectedNode,
    isSaveLoadDialogOpen,
    setNodes,
    setEdges,
    setSelectedNode,
    setIsSaveLoadDialogOpen,
  } = useModelCallDiagramState();

  const {
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    onNodeClick,
    onSaveNodeSettings,
    onDeleteNode,
    handleSave,
    handleLoad,
    exportToJson,
    createAgenticFlow,
    clearDiagram,
  } = useModelCallDiagramHandlers(nodes, edges, setNodes, setEdges, setSelectedNode, onExportJson);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col gap-2">
          <AgenticFlowWizard 
            onCreateFlow={createAgenticFlow} 
            onClearDiagram={clearDiagram}
            onSaveFlow={exportToJson}
          />
          <WizardDialog onAddNode={addNode} />
          <Button onClick={() => setIsSaveLoadDialogOpen(true)} className="w-48">Save/Load Graph</Button>
        </div>
      </div>
      {selectedNode && (
        <div className="absolute bottom-4 right-4 z-10">
          <NodeSettingsDialog
            node={selectedNode}
            onSave={onSaveNodeSettings}
            onDelete={() => onDeleteNode(selectedNode.id)}
          />
        </div>
      )}
      <SaveLoadDialog
        isOpen={isSaveLoadDialogOpen}
        onClose={() => setIsSaveLoadDialogOpen(false)}
        onSave={handleSave}
        onLoad={handleLoad}
        graphData={{ nodes, edges }}
      />
    </div>
  );
};

export default ModelCallDiagram;

// Path: src/common/components/ModelCallDiagram.jsx