import React from 'react';
import BaseNode from './BaseNode';
import { Repeat } from 'lucide-react';

const Loop = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Repeat} 
      type="loop"
      baseColor="#C05621"
      gradientFrom="from-orange-700/30"
      gradientTo="to-orange-600/10"
    >
      Loop
    </BaseNode>
  );
};

export default Loop;

// Path: src/common/components/nodes/Loop.jsx