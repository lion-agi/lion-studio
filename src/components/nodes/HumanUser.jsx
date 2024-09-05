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
      nodeData={{
        name: props.data.name || 'User',
        role: props.data.role || 'End User',
        preferences: props.data.preferences || {}
      }}
    >
      User
    </BaseNode>
  );
};

export default HumanUser;