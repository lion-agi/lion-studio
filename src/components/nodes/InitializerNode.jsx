import React from 'react';
import BaseNode from './BaseNode';
import { Play } from 'lucide-react';

const InitializerNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Play} 
      type="initializer"
      baseColor="purple"
      gradientFrom="from-purple-400/20"
      gradientTo="to-purple-300/10"
      iconColor="text-purple-600"
      label="Start"
    />
  );
};

export default InitializerNode;