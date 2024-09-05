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
      gradientFrom="from-orange-200/20"
      gradientTo="to-orange-100/10"
      iconColor="text-orange-600"
      label="Mixture-of-Experts"
    />
  );
};

export default GroupNode;