import React from 'react';
import BaseNode from './BaseNode';
import { Database } from 'lucide-react';

const DatabaseQuery = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Database} 
      type="databaseQuery"
      baseColor="#D53F8C"
      gradientFrom="from-pink-700/30"
      gradientTo="to-pink-600/10"
    >
      Database Query
    </BaseNode>
  );
};

export default DatabaseQuery;