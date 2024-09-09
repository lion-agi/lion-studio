import React from 'react';
import BaseNode from './BaseNode';
import { GitBranch } from 'lucide-react';

const ConditionalBranch = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={GitBranch} 
      type="conditionalBranch"
      baseColor="#DD6B20"
      gradientFrom="from-orange-600/30"
      gradientTo="to-orange-500/10"
    >
      Conditional Branch
    </BaseNode>
  );
};

export default ConditionalBranch;