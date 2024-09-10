import React from 'react';
import BaseNode from './BaseNode';
import { Database } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DatabaseNode = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'database')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'database');

  return (
    <BaseNode 
      {...props} 
      icon={Database} 
      type="database"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Database
    </BaseNode>
  );
};

export default DatabaseNode;
