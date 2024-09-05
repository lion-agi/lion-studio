import React from 'react';
import BaseNode from './BaseNode';
import { Workflow as WorkflowIcon } from 'lucide-react';

const WorkflowNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={WorkflowIcon} 
      type="workflow"
      baseColor="green"
      gradientFrom="from-green-400/20"
      gradientTo="to-green-300/10"
      iconColor="text-green-600"
    >
      Workflow
    </BaseNode>
  );
};

export default WorkflowNode;