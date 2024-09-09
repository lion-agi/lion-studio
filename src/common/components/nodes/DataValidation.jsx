import React from 'react';
import BaseNode from './BaseNode';
import { AlertTriangle } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DataValidation = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'dataValidation')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'dataValidation');

  return (
    <BaseNode 
      {...props} 
      icon={AlertTriangle} 
      type="dataValidation"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Data Validation
    </BaseNode>
  );
};

export default DataValidation;
