import React from 'react';
import BaseNode from './BaseNode';
import { Calendar } from 'lucide-react';

const Scheduler = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Calendar} 
      type="scheduler"
      baseColor="#319795"
      gradientFrom="from-teal-700/30"
      gradientTo="to-teal-600/10"
    >
      Scheduler
    </BaseNode>
  );
};

export default Scheduler;