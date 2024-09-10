import React from 'react';
import BaseNode from './BaseNode';
import { Sliders } from 'lucide-react';

const VariableManipulation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Sliders} 
      type="variableManipulation"
      baseColor="#285E61"
      gradientFrom="from-teal-900/30"
      gradientTo="to-teal-800/10"
    >
      Variable Manipulation
    </BaseNode>
  );
};

export default VariableManipulation;