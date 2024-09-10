import React from 'react';
import BaseNode from './BaseNode';
import { Filter } from 'lucide-react';

const DataProcessor = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Filter} 
      type="dataProcessor"
      baseColor="green"
      gradientFrom="from-green-500/30"
      gradientTo="to-green-400/10"
    >
      Data Processor
    </BaseNode>
  );
};

export default DataProcessor;