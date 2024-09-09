import { useCallback, useRef, useState } from 'react';
import { addEdge } from 'reactflow';
import { useUndoRedo } from './useUndoRedo';
import { useWorkflowSettings } from '../components/WorkflowSettingsContext';
import AgenticFlowWizard from '@/common/components/AgenticFlowWizard';

export const useWorkflowHandlers = (nodes, setNodes, edges, setEdges) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo(nodes, edges, setNodes, setEdges);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const { setBackgroundColor } = useWorkflowSettings();

  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      const newEdges = addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#6366F1', strokeWidth: 2 },
        markerEnd: { type: 'arrowclosed', color: '#6366F1' },
      }, eds);
      takeSnapshot(nodes, newEdges);
      return newEdges;
    });
  }, [nodes, setEdges, takeSnapshot]);

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

      setNodes((nds) => {
        const newNodes = nds.concat(newNode);
        takeSnapshot(newNodes, edges);
        return newNodes;
      });
    },
    [nodes, setNodes, edges, reactFlowInstance, takeSnapshot]
  );

  const onNodeDragStop = useCallback((event, node) => {
    const { x, y } = node.position;
    setNodes((nds) => {
      const updatedNodes = nds.map((n) => 
        n.id === node.id ? { ...n, position: { x: Math.round(x / 20) * 20, y: Math.round(y / 20) * 20 } } : n
      );
      takeSnapshot(updatedNodes, edges);
      return updatedNodes;
    });
  }, [setNodes, edges, takeSnapshot]);

  const handleExportJSON = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      return flow;
    }
    return null;
  }, [reactFlowInstance]);

  const handleSaveLoad = useCallback((savedGraph) => {
    if (savedGraph) {
      setNodes(savedGraph.nodes || []);
      setEdges(savedGraph.edges || []);
      takeSnapshot(savedGraph.nodes || [], savedGraph.edges || []);
    }
  }, [setNodes, setEdges, takeSnapshot]);

  const handleCreateAgenticFlow = useCallback(() => {
    setIsWizardOpen(true);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    console.log('Node clicked:', node);
  }, []);

  const handleDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => {
      const updatedNodes = nds.filter((node) => node.id !== nodeId);
      setEdges((eds) => {
        const updatedEdges = eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
        takeSnapshot(updatedNodes, updatedEdges);
        return updatedEdges;
      });
      return updatedNodes;
    });
  }, [setNodes, setEdges, takeSnapshot]);

  const handleSaveSettings = useCallback((settings) => {
    if (settings.backgroundColor) {
      setBackgroundColor(settings.backgroundColor);
    }
    // Handle other settings here
  }, [setBackgroundColor]);

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
    undo,
    redo,
    canUndo,
    canRedo,
    handleDeleteNode,
    handleSaveSettings,
    isWizardOpen,
    setIsWizardOpen,
  };
};

// Path: src/features/workflow/hooks/useEdgeHighlighting.js