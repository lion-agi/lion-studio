import React from 'react';
import BaseNode from './BaseNode';
import { Lock } from 'lucide-react';

const Authentication = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Lock} 
      type="authentication"
      baseColor="#97266D"
      gradientFrom="from-pink-900/30"
      gradientTo="to-pink-800/10"
    >
      Authentication
    </BaseNode>
  );
};

export default Authentication;