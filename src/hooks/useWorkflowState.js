import { useCallback } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

export const useWorkflowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const addNode = useCallback((nodeData) => {
    setNodes((nds) => [...nds, nodeData]);
  }, [setNodes]);

  const updateNode = useCallback((id, data) => {
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node)));
  }, [setNodes]);

  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
    updateNode,
    deleteNode,
  };
};