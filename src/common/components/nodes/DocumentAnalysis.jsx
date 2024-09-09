import React from 'react';
import BaseNode from './BaseNode';
import { FileText } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const DocumentAnalysis = (props) => {
  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'documentAnalysis')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'documentAnalysis');

  return (
    <BaseNode 
      {...props} 
      icon={FileText} 
      type="documentAnalysis"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
    >
      Document Analysis
    </BaseNode>
  );
};

export default DocumentAnalysis;
