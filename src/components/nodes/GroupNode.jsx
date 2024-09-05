import React from 'react';
import BaseNode from './BaseNode';
import { Users } from 'lucide-react';

const GroupNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Users} 
      type="group"
      baseColor="shrimpRed"
      gradientFrom="from-red-400/20"
      gradientTo="to-red-300/10"
      iconColor="text-red-600"
    >
      Mixture of Experts
    </BaseNode>
  );
};

export default GroupNode;