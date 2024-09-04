import { useCallback } from 'react';
import { addEdge } from 'reactflow';

export const useWorkflowHandlers = (nodes, setNodes, edges, setEdges, reactFlowWrapper, reactFlowInstance, sidebarExpanded, setSidebarExpanded) => {
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({
    ...params,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366F1', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#6366F1' },
  }, eds)), [setEdges]);

  const addNode = useCallback((nodeData) => {
    const newNode = {
      id: `${nodeData.type}-${nodes.length + 1}`,
      type: nodeData.type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: nodeData.name, ...nodeData },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded(!sidebarExpanded);
  }, [sidebarExpanded, setSidebarExpanded]);

  const toggleCategory = useCallback((category) => {
    // This function should be implemented in the component that manages category state
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        console.error('ReactFlow is not initialized');
        return;
      }

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
    [nodes, setNodes, reactFlowInstance, reactFlowWrapper]
  );

  const handleExportJSON = useCallback(() => {
    const graphData = { nodes, edges };
    console.log('Exporting JSON:', graphData);
    // Implement actual export logic here
  }, [nodes, edges]);

  const handleSaveLoad = useCallback(() => {
    console.log('Save/Load dialog should be shown');
    // Implement save/load dialog logic here
  }, []);

  const handleCreateAgenticFlow = useCallback((flowConfig) => {
    console.log('Creating new flow:', flowConfig);
    // Implement the logic to create a new flow based on the configuration
  }, []);

  const handleOpenNodeWizard = useCallback((nodeType) => {
    console.log('Opening node wizard for type:', nodeType);
    // Implement node wizard opening logic here
  }, []);

  const onNodeClick = useCallback((event, node) => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, [setNodes]);

  return {
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
  };
};