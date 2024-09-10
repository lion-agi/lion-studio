import React from 'react';
import BaseNode from './BaseNode';
import { FileText } from 'lucide-react';

const DocumentAnalysis = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={FileText} 
      type="documentAnalysis"
      baseColor="yellow"
      gradientFrom="from-yellow-500/30"
      gradientTo="to-yellow-400/10"
    >
      Document Analysis
    </BaseNode>
  );
};

export default DocumentAnalysis;