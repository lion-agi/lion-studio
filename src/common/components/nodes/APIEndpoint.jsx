import React from 'react';
import BaseNode from './BaseNode';
import { Globe } from 'lucide-react';

const APIEndpoint = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Globe} 
      type="apiEndpoint"
      baseColor="teal"
      gradientFrom="from-teal-500/30"
      gradientTo="to-teal-400/10"
    >
      API Endpoint
    </BaseNode>
  );
};

export default APIEndpoint;