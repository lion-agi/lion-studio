import React from 'react';
import BaseNode from './BaseNode';
import { Globe } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const APIEndpoint = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'apiEndpoint')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'apiEndpoint');

  return (
    <BaseNode 
      {...props} 
      icon={Globe} 
      type="apiEndpoint"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      API Endpoint
    </BaseNode>
  );
};

export default APIEndpoint;

// Path: src/common/components/nodes/APIEndpoint.jsx