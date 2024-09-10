import { useCallback, useState, useEffect } from 'react';

export const useEdgeHighlighting = (edges, setEdges) => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(prevId => prevId === node.id ? null : node.id);
  }, []);

  const getEdgeStyle = useCallback((edge) => {
    if (!selectedNodeId) {
      return {
        stroke: '#BDC3C7',
        strokeWidth: 2,
        transition: 'all 0.3s ease',
      };
    }

    const isConnected = edge.source === selectedNodeId || edge.target === selectedNodeId;
    return {
      stroke: isConnected ? '#3498DB' : '#7F8C8D',
      strokeWidth: isConnected ? 3 : 1,
      transition: 'all 0.3s ease',
      opacity: isConnected ? 1 : 0.4,
    };
  }, [selectedNodeId]);

  const edgeOptions = {
    type: 'smoothstep',
    animated: true,
    style: {
      stroke: '#BDC3C7',
      strokeWidth: 2,
    },
  };

  useEffect(() => {
    setEdges(prevEdges => prevEdges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
      animated: !selectedNodeId || edge.source === selectedNodeId || edge.target === selectedNodeId,
    })));
  }, [selectedNodeId, setEdges, getEdgeStyle]);

  return { onNodeClick, edgeOptions, getEdgeStyle };
};