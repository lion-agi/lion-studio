import React from 'react';
import BaseNode from './BaseNode';
import { Mail } from 'lucide-react';

const Email = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Mail} 
      type="email"
      baseColor="#2C5282"
      gradientFrom="from-blue-800/30"
      gradientTo="to-blue-700/10"
    >
      Email
    </BaseNode>
  );
};

export default Email;