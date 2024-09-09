import React from 'react';
import BaseNode from './BaseNode';
import { MessageSquare } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const Conversation = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'conversation')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'conversation');

  return (
    <BaseNode 
      {...props} 
      icon={MessageSquare} 
      type="conversation"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Conversation
    </BaseNode>
  );
};

export default Conversation;


// Path: src/common/components/nodes/Conversation.jsx