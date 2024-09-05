import React from 'react';
import BaseNode from './BaseNode';
import { Users } from 'lucide-react';

const MixtureOfExperts = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Users} 
      type="experts"
      baseColor="red"
      gradientFrom="from-red-400/20"
      gradientTo="to-red-300/10"
      iconColor="text-red-600"
      nodeData={{
        name: props.data.name || 'Expert Group',
        experts: props.data.experts || [],
        selectionCriteria: props.data.selectionCriteria || 'random'
      }}
    >
      Mixture of Experts
    </BaseNode>
  );
};

export default MixtureOfExperts;