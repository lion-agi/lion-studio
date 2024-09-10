import React from 'react';
import BaseNode from './BaseNode';
import { Shuffle } from 'lucide-react';

const DataTransformation = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Shuffle} 
      type="dataTransformation"
      baseColor="#2F855A"
      gradientFrom="from-green-700/30"
      gradientTo="to-green-600/10"
    >
      Data Transformation
    </BaseNode>
  );
};

export default DataTransformation;