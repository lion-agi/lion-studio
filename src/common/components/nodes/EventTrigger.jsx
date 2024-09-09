import React from 'react';
import BaseNode from './BaseNode';
import { Cpu } from 'lucide-react';

const EventTrigger = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Cpu} 
      type="eventTrigger"
      baseColor="red"
      gradientFrom="from-red-500/30"
      gradientTo="to-red-400/10"
    >
      Event Trigger
    </BaseNode>
  );
};

export default EventTrigger;