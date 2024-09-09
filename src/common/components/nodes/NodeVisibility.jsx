import React, { useEffect, useState } from 'react';
import { nodeCategories } from './nodeCategories';

const NodeVisibility = ({ nodes, background }) => {
  const [adjustedNodes, setAdjustedNodes] = useState([]);

  useEffect(() => {
    const adjustNodeStyles = () => {
      return nodes.map(node => {
        const nodeCategory = nodeCategories.find(category =>
          category.nodes.some(n => n.type === node.type)
        );

        const nodeConfig = nodeCategory.nodes.find(n => n.type === node.type);

        // Adjust node styles for contrast and readability
        const adjustedNode = {
          ...node,
          style: {
            ...node.style,
            background: `linear-gradient(to bottom right, ${nodeConfig.gradientFrom}, ${nodeConfig.gradientTo})`,
            color: background === 'dark' ? '#FFFFFF' : '#000000',
            borderColor: nodeConfig.baseColor,
          },
        };

        return adjustedNode;
      });
    };

    setAdjustedNodes(adjustNodeStyles());
  }, [nodes, background]);

  return (
    <div className="node-visibility">
      {adjustedNodes.map(node => (
        <div key={node.id} className="node" style={node.style}>
          {node.label}
        </div>
      ))}
    </div>
  );
};

export default NodeVisibility;
