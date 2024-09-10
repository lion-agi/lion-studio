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
      gradientFrom="from-blue-400/30"
      gradientTo="to-blue-300/10"
    >
      User
    </BaseNode>
  );
};

export default HumanUser;