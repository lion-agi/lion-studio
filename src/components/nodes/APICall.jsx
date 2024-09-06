import React from 'react';
import BaseNode from './BaseNode';
import { Zap } from 'lucide-react';

const APICall = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Zap} 
      type="APICall"
      baseColor="pink"
      gradientFrom="from-pink-500/30"
      gradientTo="to-pink-400/10"
    >
      API Call
    </BaseNode>
  );
};

export default APICall;