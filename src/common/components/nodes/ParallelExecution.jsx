import React from 'react';
import BaseNode from './BaseNode';
import { Layers } from 'lucide-react';

const ParallelExecution = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Layers} 
      type="parallelExecution"
      baseColor="#9C4221"
      gradientFrom="from-orange-800/30"
      gradientTo="to-orange-700/10"
    >
      Parallel Execution
    </BaseNode>
  );
};

export default ParallelExecution;

// Path: src/common/components/nodes/ParallelExecution.jsx