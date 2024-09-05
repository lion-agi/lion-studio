import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const AssistantNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={Bot} 
      type="Assistant"
      baseColor="brushedBronze"
      gradientFrom="from-amber-700/20"
      gradientTo="to-amber-600/10"
      iconColor="text-amber-800"
      nodeData={{
        name: props.data.name || 'Assistant',
        model: props.data.model || 'GPT-3.5',
        temperature: props.data.temperature || 0.7,
        maxTokens: props.data.maxTokens || 150,
        systemPrompt: props.data.systemPrompt || ''
      }}
    >
      Assistant
    </BaseNode>
  );
};

export default AssistantNode;