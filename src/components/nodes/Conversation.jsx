import React from 'react';
import BaseNode from './BaseNode';
import { Conversation } from 'lucide-react';

const Conversation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Conversation} 
      type="conversation"
      baseColor="brown"
      gradientFrom="from-brown-400/20"
      gradientTo="to-brown-300/10"
      iconColor="text-brown-600"
    >
      Note
    </BaseNode>
  );
};

export default Conversation;