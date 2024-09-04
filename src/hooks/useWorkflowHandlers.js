import { useCallback } from 'react';
import { addEdge } from 'reactflow';

export const useWorkflowHandlers = (nodes, setNodes, edges, setEdges, reactFlowInstance) => {
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
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  }, [setExpandedCategories]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

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
    [nodes, setNodes, reactFlowInstance]
  );

  const handleExportJSON = useCallback(() => {
    const graphData = { nodes, edges };
    setShowJSONModal(true);
  }, [nodes, edges, setShowJSONModal]);

  const handleSaveLoad = useCallback(() => {
    setShowSaveLoadDialog(true);
  }, [setShowSaveLoadDialog]);

  const handleCreateAgenticFlow = useCallback((flowConfig) => {
    console.log('Creating new flow:', flowConfig);
    // Implement the logic to create a new flow based on the configuration
  }, []);

  const handleOpenNodeWizard = useCallback((nodeType) => {
    setNodeWizardType(nodeType);
    setShowNodeWizard(true);
  }, [setNodeWizardType, setShowNodeWizard]);

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