import React from 'react';
import BaseNode from './BaseNode';
import { Database } from 'lucide-react';

const DatabaseNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Database} 
      type="database"
      baseColor="indigo"
      gradientFrom="from-indigo-400/20"
      gradientTo="to-indigo-300/10"
      iconColor="text-indigo-600"
    >
      Database
    </BaseNode>
  );
};

export default DatabaseNode;