import React from 'react';
import BaseNode from './BaseNode';
import { AlertTriangle } from 'lucide-react';

const DataValidation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={AlertTriangle} 
      type="dataValidation"
      baseColor="#22543D"
      gradientFrom="from-green-900/30"
      gradientTo="to-green-800/10"
    >
      Data Validation
    </BaseNode>
  );
};

export default DataValidation;