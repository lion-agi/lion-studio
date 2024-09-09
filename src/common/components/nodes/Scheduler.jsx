import React from 'react';
import BaseNode from './BaseNode';
import { Clock } from 'lucide-react';

const Scheduler = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Clock} 
      type="scheduler"
      baseColor="indigo"
      gradientFrom="from-indigo-500/30"
      gradientTo="to-indigo-400/10"
    >
      Scheduler
    </BaseNode>
  );
};

export default Scheduler;