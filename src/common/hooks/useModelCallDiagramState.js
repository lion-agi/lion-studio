import { useState, useEffect } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

export const useModelCallDiagramState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSaveLoadDialogOpen, setIsSaveLoadDialogOpen] = useState(false);

  return {
    nodes,
    edges,
    selectedNode,
    isSaveLoadDialogOpen,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    setSelectedNode,
    setIsSaveLoadDialogOpen,
  };
};