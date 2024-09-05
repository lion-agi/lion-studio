import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const AssistantNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Bot} 
      type="assistant"
      baseColor="gray"
      gradientFrom="from-gray-400/20"
      gradientTo="to-gray-300/10"
      iconColor="text-gray-600"
    />
  );
};

export default AssistantNode;