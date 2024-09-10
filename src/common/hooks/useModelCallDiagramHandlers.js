import { useCallback, useEffect } from 'react';
import { addEdge } from 'reactflow';
import { dataPreprocessingFlow, modelExecutionFlow, flowTypeToNodes } from '../../data/flowTemplates';

export const useModelCallDiagramHandlers = (nodes, edges, setNodes, setEdges, setSelectedNode, onExportJson) => {
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback((nodeData) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      data: { 
        label: nodeData.name,
        ...nodeData
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onSaveNodeSettings = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
    setSelectedNode(null);
  }, [setNodes]);

  const onDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  const handleSave = (savedGraph) => {
    console.log('Graph saved:', savedGraph);
  };

  const handleLoad = (loadedGraphData) => {
    setNodes(loadedGraphData.nodes);
    setEdges(loadedGraphData.edges);
  };

  const exportToJson = useCallback(() => {
    const graphData = {
      nodes,
      edges,
    };
    onExportJson(graphData);
  }, [nodes, edges, onExportJson]);

  useEffect(() => {
    exportToJson();
  }, [exportToJson]);

  const createAgenticFlow = (flowConfig) => {
    if (flowConfig.type === "Data Preprocessing") {
      setNodes(dataPreprocessingFlow.nodes);
      setEdges(dataPreprocessingFlow.edges);
    } else if (flowConfig.type === "Model Execution") {
      setNodes(modelExecutionFlow.nodes);
      setEdges(modelExecutionFlow.edges);
    } else {
      const nodeTypes = flowTypeToNodes[flowConfig.type] || ["Default"];
      const newNodes = nodeTypes.map((nodeType, index) => ({
        id: `flow-${nodes.length + index + 1}`,
        type: 'default',
        data: { 
          label: nodeType,
          type: flowConfig.type,
          description: `${flowConfig.description} - ${nodeType}`
        },
        position: { x: 100 + index * 150, y: 100 + index * 50 },
      }));
      setNodes((nds) => [...nds, ...newNodes]);

      const newEdges = newNodes.slice(0, -1).map((node, index) => ({
        id: `edge-${edges.length + index + 1}`,
        source: node.id,
        target: newNodes[index + 1].id,
        type: 'smoothstep',
      }));
      setEdges((eds) => [...eds, ...newEdges]);
    }
  };

  const clearDiagram = () => {
    setNodes([]);
    setEdges([]);
  };

  return {
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
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
  };
};