import React from 'react';
import BaseNode from './BaseNode';
import { GitBranch } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const ConditionalBranch = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'conditionalBranch')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'conditionalBranch');

  return (
    <BaseNode 
      {...props} 
      icon={GitBranch} 
      type="conditionalBranch"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Conditional Branch
    </BaseNode>
  );
};

export default ConditionalBranch;
