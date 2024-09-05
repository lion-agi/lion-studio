import React from 'react';
import BaseNode from './BaseNode';
import { Users } from 'lucide-react';

const GroupNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Users} 
      type="group"
      baseColor="rustedBronzeGreen"
      gradientFrom="from-green-700/20"
      gradientTo="to-green-600/10"
      iconColor="text-green-800"
    >
      Mixture of Experts
    </BaseNode>
  );
};

export default GroupNode;