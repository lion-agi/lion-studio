import React from 'react';
import BaseNode from './BaseNode';
import { AlertTriangle } from 'lucide-react';

const ErrorHandler = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={AlertTriangle} 
      type="errorHandler"
      baseColor="#7B341E"
      gradientFrom="from-orange-900/30"
      gradientTo="to-orange-800/10"
    >
      Error Handler
    </BaseNode>
  );
};

export default ErrorHandler;