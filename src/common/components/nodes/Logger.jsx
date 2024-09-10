import React from 'react';
import BaseNode from './BaseNode';
import { Paperclip } from 'lucide-react';

const Logger = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Paperclip} 
      type="logger"
      baseColor="#2C7A7B"
      gradientFrom="from-teal-800/30"
      gradientTo="to-teal-700/10"
    >
      Logger
    </BaseNode>
  );
};

export default Logger;