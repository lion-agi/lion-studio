import React from 'react';
import BaseNode from './BaseNode';
import { Code } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const CodeExecution = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'codeExecution')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'codeExecution');

  return (
    <BaseNode 
      {...props} 
      icon={Code} 
      type="codeExecution"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Code Execution
    </BaseNode>
  );
};

export default CodeExecution;

// Path: src/common/components/nodes/CodeExecution.jsx