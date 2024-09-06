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
      gradientFrom="from-indigo-500/30"
      gradientTo="to-indigo-400/10"
    >
      Database Node
    </BaseNode>
  );
};

export default DatabaseNode;