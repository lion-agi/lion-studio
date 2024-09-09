import React from 'react';
import BaseNode from './BaseNode';
import { Wrench } from 'lucide-react';

const Tool = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Wrench} 
      type="tool"
      baseColor="gray"
      gradientFrom="from-gray-500/30"
      gradientTo="to-gray-400/10"
    >
      Tool
    </BaseNode>
  );
};

export default Tool;

// Path: src/common/components/nodes/Tool.jsx