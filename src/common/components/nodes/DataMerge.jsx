import React from 'react';
import BaseNode from './BaseNode';
import { GitMerge } from 'lucide-react';

const DataMerge = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={GitMerge} 
      type="dataMerge"
      baseColor="#276749"
      gradientFrom="from-green-800/30"
      gradientTo="to-green-700/10"
    >
      Data Merge
    </BaseNode>
  );
};

export default DataMerge;