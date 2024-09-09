import React from 'react';
import BaseNode from './BaseNode';
import { Zap } from 'lucide-react';

const Webhook = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Zap} 
      type="webhook"
      baseColor="pink"
      gradientFrom="from-pink-500/30"
      gradientTo="to-pink-400/10"
    >
      Webhook
    </BaseNode>
  );
};

export default Webhook;