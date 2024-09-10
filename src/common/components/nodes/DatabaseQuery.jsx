import React from 'react';
import BaseNode from './BaseNode';
import { Database } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DatabaseQuery = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'databaseQuery')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'databaseQuery');

  return (
    <BaseNode 
      {...props} 
      icon={Database} 
      type="databaseQuery"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Database Query
    </BaseNode>
  );
};

export default DatabaseQuery;
