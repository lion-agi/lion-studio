import React from 'react';
import BaseNode from './BaseNode';
import { Brain } from 'lucide-react';

const AIModel = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Brain} 
      type="aiModel"
      baseColor="purple"
      gradientFrom="from-purple-500/30"
      gradientTo="to-purple-400/10"
    >
      AI Model
    </BaseNode>
  );
};

export default AIModel;