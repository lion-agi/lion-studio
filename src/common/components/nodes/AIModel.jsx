import React from 'react';
import BaseNode from './BaseNode';
import { Brain } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const AIModel = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'aiModel')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'aiModel');

  return (
    <BaseNode 
      {...props} 
      icon={Brain} 
      type="aiModel"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      AI Model
    </BaseNode>
  );
};

export default AIModel;

// Path: src/common/components/nodes/AIModel.jsx