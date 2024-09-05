import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const Assistant = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Bot} 
      type="assistant"
      baseColor="brushedBronze"
      gradientFrom="from-amber-700/20"
      gradientTo="to-amber-600/10"
      iconColor="text-amber-800"
    />
  );
};

export default Assistant;