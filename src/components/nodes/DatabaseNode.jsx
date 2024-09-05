import React from 'react';
import BaseNode from './BaseNode';
import { Database } from 'lucide-react';

const DatabaseNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Database} 
      type="database"
      baseColor="lavender"
      gradientFrom="from-lavender-400/20"
      gradientTo="to-lavender-300/10"
      iconColor="text-lavender-600"
    />
  );
};

export default DatabaseNode;