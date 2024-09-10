import React from 'react';
import BaseNode from './BaseNode';
import { Briefcase } from 'lucide-react';

const Worker = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Briefcase} 
      type="worker"
      baseColor="orange"
      gradientFrom="from-orange-500/30"
      gradientTo="to-orange-400/10"
    >
      Worker
    </BaseNode>
  );
};

export default Worker;