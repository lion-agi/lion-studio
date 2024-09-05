import React from 'react';
import BaseNode from './BaseNode';
import { Users } from 'lucide-react';

const GroupNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Users} 
      type="group"
      baseColor="orange"
      gradientFrom="from-orange-400/20"
      gradientTo="to-orange-300/10"
      iconColor="text-orange-600"
    >
      Mixture Of Experts
    </BaseNode>
  );
};

export default GroupNode;