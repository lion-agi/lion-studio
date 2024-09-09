import React from 'react';
import BaseNode from './BaseNode';
import { Shuffle } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DataTransformation = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'dataTransformation')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'dataTransformation');

  return (
    <BaseNode 
      {...props} 
      icon={Shuffle} 
      type="dataTransformation"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Data Transformation
    </BaseNode>
  );
};

export default DataTransformation;
