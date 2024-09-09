import React from 'react';
import BaseNode from './BaseNode';
import { Filter } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DataProcessor = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'dataProcessor')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'dataProcessor');

  return (
    <BaseNode 
      {...props} 
      icon={Filter} 
      type="dataProcessor"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Data Processor
    </BaseNode>
  );
};

export default DataProcessor;


// Path: src/common/components/nodes/DataProcessor.jsx