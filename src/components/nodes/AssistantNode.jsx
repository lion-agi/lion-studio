import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const AssistantNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Bot} 
      type="Assistant"
      baseColor="amber"
      gradientFrom="from-amber-800/30"
      gradientTo="to-amber-700/10"
    >
      Assistant Node
    </BaseNode>
  );
};

export default AssistantNode;