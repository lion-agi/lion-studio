import React from 'react';
import BaseNode from './BaseNode';
import { AlertTriangle } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const ErrorHandler = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'errorHandler')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'errorHandler');

  return (
    <BaseNode 
      {...props} 
      icon={AlertTriangle} 
      type="errorHandler"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Error Handler
    </BaseNode>
  );
};

export default ErrorHandler;
