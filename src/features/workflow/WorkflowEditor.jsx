import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '@/common/components/nodes';
import { useWorkflowState } from '../hooks/useWorkflowState';
import { useWorkflowHandlers } from '../hooks/useWorkflowHandlers';
import { useEdgeHighlighting } from '../hooks/useEdgeHighlighting';

const GRID_SIZE = 20;

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
  } = useWorkflowHandlers(nodes, setNodes, edges, setEdges);

  const { onNodeClick, edgeOptions, getEdgeStyle } = useEdgeHighlighting(edges, setEdges);

  const styledEdges = useMemo(() => 
    edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge),
    })),
    [edges, getEdgeStyle]
  );

  return (
    <div className="h-full w-full" ref={reactFlowWrapper}>
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
        snapToGrid={true}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        fitView
        style={{
          backgroundColor: '#2C3E50',
        }}
      >
        <Background 
          variant="dots" 
          gap={GRID_SIZE} 
          size={1} 
          color="rgba(255, 255, 255, 0.05)" 
          style={{ zIndex: -1 }}
        />
        <Controls 
          style={{
            button: {
              backgroundColor: '#34495E',
              color: '#ECF0F1',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
            },
          }}
        />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'user': return '#3498DB';
              case 'agent': return '#2ECC71';
              case 'assistant': return '#F39C12';
              case 'group': return '#E74C3C';
              case 'initializer': return '#9B59B6';
              case 'conversation': return '#1ABC9C';
              case 'note': return '#34495E';
              default: return '#95A5A6';
            }
          }}
          nodeStrokeWidth={3} 
          zoomable 
          pannable
          style={{
            backgroundColor: '#34495E',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default WorkflowEditor;