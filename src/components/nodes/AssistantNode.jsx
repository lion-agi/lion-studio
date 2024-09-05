import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const AssistantNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Bot} 
      type="Assistant"
      baseColor="brushedBronze"
      gradientFrom="from-amber-700/20"
      gradientTo="to-amber-600/10"
      iconColor="text-amber-800"
    >
      Assistant Node
    </BaseNode>
  );
};

export default AssistantNode;