import React from 'react';
import BaseNode from './BaseNode';
import { GitMerge } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DataMerge = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'dataMerge')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'dataMerge');

  return (
    <BaseNode 
      {...props} 
      icon={GitMerge} 
      type="dataMerge"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Data Merge
    </BaseNode>
  );
};

export default DataMerge;


// Path: src/common/components/nodes/DataMerge.jsx