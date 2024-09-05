import React from 'react';
import BaseNode from './BaseNode';
import { Users } from 'lucide-react';

const GroupNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Users} 
      type="group"
      baseColor="brushedSilver"
      gradientFrom="from-gray-400/20"
      gradientTo="to-gray-300/10"
      iconColor="text-gray-600"
    >
      Mixture of Experts
    </BaseNode>
  );
};

export default GroupNode;