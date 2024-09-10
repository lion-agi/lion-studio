import React from 'react';
import BaseNode from './BaseNode';
import { Share2 } from 'lucide-react';

const Webhook = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Share2} 
      type="webhook"
      baseColor="#ED64A6"
      gradientFrom="from-pink-600/30"
      gradientTo="to-pink-500/10"
    >
      Webhook
    </BaseNode>
  );
};

export default Webhook;

// Path: src/common/components/nodes/Webhook.jsx