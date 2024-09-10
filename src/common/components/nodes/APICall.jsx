import React from 'react';
import BaseNode from './BaseNode';
import { Zap } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const APICall = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'apiCall')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'apiCall');

  return (
    <BaseNode 
      {...props} 
      icon={Zap} 
      type="apiCall"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      API Call
    </BaseNode>
  );
};

export default APICall;