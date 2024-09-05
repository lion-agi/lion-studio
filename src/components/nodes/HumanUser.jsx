import React from 'react';
import BaseNode from './BaseNode';
import { User } from 'lucide-react';

const HumanUser = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={User} 
      type="user"
      baseColor="blue"
      gradientFrom="from-blue-400/20"
      gradientTo="to-blue-300/10"
      iconColor="text-blue-600"
    >
      User Node
    </BaseNode>
  );
};

export default HumanUser;