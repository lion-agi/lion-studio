import React from 'react';
import BaseNode from './BaseNode';
import { Workflow } from 'lucide-react';

const WorkflowNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Workflow} 
      type="workflow"
      baseColor="green"
      gradientFrom="from-green-500/30"
      gradientTo="to-green-400/10"
    >
      Workflow
    </BaseNode>
  );
};

export default WorkflowNode;