import React from 'react';
import BaseNode from './BaseNode';
import { Zap } from 'lucide-react';

const APICall = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Zap} 
      type="api"
      baseColor="pink"
      gradientFrom="from-pink-400/20"
      gradientTo="to-pink-300/10"
      iconColor="text-pink-600"
    >
      API Call
    </BaseNode>
  );
};

export default APICall;