import React from 'react';
import BaseNode from './BaseNode';
import { Play } from 'lucide-react';

const Initializer = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Play} 
      type="initializer"
      baseColor="purple"
      gradientFrom="from-purple-700/30"
      gradientTo="to-purple-400/10"
    >
      Start
    </BaseNode>
  );
};

export default Initializer;

// Path: src/common/components/nodes/Initializer.jsx