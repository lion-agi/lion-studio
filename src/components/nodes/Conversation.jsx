import React from 'react';
import BaseNode from './BaseNode';
import { Conversation as ConversationIcon } from 'lucide-react';

const ConversationNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={ConversationIcon} 
      type="conversation"
      baseColor="brown"
      gradientFrom="from-brown-400/20"
      gradientTo="to-brown-300/10"
      iconColor="text-brown-600"
    >
      Conversation
    </BaseNode>
  );
};

export default ConversationNode;