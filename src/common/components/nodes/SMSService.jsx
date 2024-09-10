import React from 'react';
import BaseNode from './BaseNode';
import { MessageSquare } from 'lucide-react';

const SMSService = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={MessageSquare} 
      type="smsService"
      baseColor="#C53030"
      gradientFrom="from-red-800/30"
      gradientTo="to-red-700/10"
    >
      SMS Service
    </BaseNode>
  );
};

export default SMSService;