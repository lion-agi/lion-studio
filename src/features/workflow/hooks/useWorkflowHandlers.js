import { useCallback, useRef, useState } from 'react';
import { addEdge } from 'reactflow';

export const useWorkflowHandlers = (nodes, setNodes, edges, setEdges) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({
    ...params,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#6366F1', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed', color: '#6366F1' },
  }, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
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
    [nodes, setNodes, reactFlowInstance]
  );

  const onNodeDragStop = useCallback((event, node) => {
    const { x, y } = node.position;
    setNodes((nds) =>
      nds.map((n) => (n.id === node.id ? { ...n, position: { x: Math.round(x / 20) * 20, y: Math.round(y / 20) * 20 } } : n))
    );
  }, [setNodes]);

  const handleExportJSON = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(flow);
      // Here you would typically save or process the JSON data
    }
  }, [reactFlowInstance]);

  const handleSaveLoad = useCallback((savedGraph) => {
    console.log('Graph saved:', savedGraph);
    // Here you would typically implement the actual save logic
  }, []);

  const handleCreateAgenticFlow = useCallback((flowConfig) => {
    console.log('Creating new flow:', flowConfig);
    // Here you would implement the logic to create a new flow based on the configuration
  }, []);

  const onNodeClick = useCallback((event, node) => {
    console.log('Node clicked:', node);
    // Here you would implement any node click behavior
  }, []);

  return {
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
    onNodeClick,
  };
};