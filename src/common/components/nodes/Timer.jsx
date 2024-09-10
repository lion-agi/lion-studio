import React from 'react';
import BaseNode from './BaseNode';
import { Clock } from 'lucide-react';

const Timer = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Clock} 
      type="timer"
      baseColor="#38B2AC"
      gradientFrom="from-teal-600/30"
      gradientTo="to-teal-500/10"
    >
      Timer
    </BaseNode>
  );
};

export default Timer;

// Path: src/common/components/nodes/Timer.jsx
