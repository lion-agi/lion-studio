import React from 'react';
import { MiniMap } from 'reactflow';
import { nodeCategories } from './nodes/nodeCategories';

const getNodeColor = (node) => {
  const nodeConfig = nodeCategories
    .flatMap(category => category.nodes)
    .find(n => n.type === node.type);

  return nodeConfig ? nodeConfig.baseColor : '#64748B';
};

const ReactFlowMinimap = () => {
  return (
    <MiniMap
      nodeColor={getNodeColor}
      nodeStrokeWidth={3}
      nodeBorderRadius={2}
    />
  );
};

export default ReactFlowMinimap;


// Path: src/common/components/ReactFlowMinimap.jsx