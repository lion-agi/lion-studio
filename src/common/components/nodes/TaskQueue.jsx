import React from 'react';
import BaseNode from './BaseNode';
import { List } from 'lucide-react';

const TaskQueue = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={List} 
      type="taskQueue"
      baseColor="teal"
      gradientFrom="from-teal-500/30"
      gradientTo="to-teal-400/10"
    >
      Task Queue
    </BaseNode>
  );
};

export default TaskQueue;