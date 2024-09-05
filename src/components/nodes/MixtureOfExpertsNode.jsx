import React from 'react';
import BaseNode from './BaseNode';
import { Users } from 'lucide-react';

const MixtureOfExpertsNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Users} 
      type="mixtureOfExperts"
      baseColor="orange"
      gradientFrom="from-orange-400/20"
      gradientTo="to-orange-300/10"
      iconColor="text-orange-600"
    >
      Mixture Of Experts
    </BaseNode>
  );
};

export default MixtureOfExpertsNode;