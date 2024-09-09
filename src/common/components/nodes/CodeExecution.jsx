import React from 'react';
import BaseNode from './BaseNode';
import { Code } from 'lucide-react';

const CodeExecution = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Code} 
      type="codeExecution"
      baseColor="cyan"
      gradientFrom="from-cyan-500/30"
      gradientTo="to-cyan-400/10"
    >
      Code Execution
    </BaseNode>
  );
};

export default CodeExecution;