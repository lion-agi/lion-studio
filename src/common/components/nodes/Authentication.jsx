import React from 'react';
import BaseNode from './BaseNode';
import { Lock } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const Authentication = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'authentication')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'authentication');

  return (
    <BaseNode 
      {...props} 
      icon={Lock} 
      type="authentication"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Authentication
    </BaseNode>
  );
};

export default Authentication;
