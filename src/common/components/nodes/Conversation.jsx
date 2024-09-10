import React from 'react';
import BaseNode from './BaseNode';
import { MessageSquare } from 'lucide-react';

const Conversation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={MessageSquare} 
      type="conversation"
      baseColor="blue"
      gradientFrom="from-blue-500/30"
      gradientTo="to-blue-400/10"
    >
      Conversation
    </BaseNode>
  );
};

export default Conversation;