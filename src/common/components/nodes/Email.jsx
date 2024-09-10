import React from 'react';
import BaseNode from './BaseNode';
import { Mail } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const Email = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'email')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'email');

  return (
    <BaseNode 
      {...props} 
      icon={Mail} 
      type="email"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Email
    </BaseNode>
  );
};

export default Email;
