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
      gradientFrom="from-red-700/30"
      gradientTo="to-red-400/10"
    >
      Mixture of Experts
    </BaseNode>
  );
};

export default MixtureOfExperts;

// Path: src/common/components/nodes/MixtureOfExperts.jsx