import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const AssistantNode = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'assistant')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'assistant');

  return (
    <BaseNode 
      {...props} 
      icon={Bot} 
      type="assistant"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Assistant
    </BaseNode>
  );
};

export default AssistantNode;
