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
      gradientFrom="from-purple-400/20"
      gradientTo="to-purple-300/10"
      iconColor="text-purple-600"
      nodeData={{
        name: props.data.name || 'Start',
        initialData: props.data.initialData || {},
        startCondition: props.data.startCondition || 'manual'
      }}
    >
      Start
    </BaseNode>
  );
};

export default Initializer;