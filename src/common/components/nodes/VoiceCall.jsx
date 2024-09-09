import React from 'react';
import BaseNode from './BaseNode';
import { Phone } from 'lucide-react';

const VoiceCall = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Phone} 
      type="voiceCall"
      baseColor="#2A4365"
      gradientFrom="from-blue-900/30"
      gradientTo="to-blue-800/10"
    >
      Voice Call
    </BaseNode>
  );
};

export default VoiceCall;

// Path: src/common/components/nodes/VoiceCall.jsx