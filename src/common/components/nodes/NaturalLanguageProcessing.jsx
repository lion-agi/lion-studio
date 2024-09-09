import React from 'react';
import BaseNode from './BaseNode';
import { Mic } from 'lucide-react';

const NaturalLanguageProcessing = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Mic} 
      type="naturalLanguageProcessing"
      baseColor="#805AD5"
      gradientFrom="from-purple-600/30"
      gradientTo="to-purple-500/10"
    >
      NLP
    </BaseNode>
  );
};

export default NaturalLanguageProcessing;

// Path: src/common/components/nodes/NaturalLanguageProcessing.jsx