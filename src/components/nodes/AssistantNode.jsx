import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';

const AssistantNode = (props) => {
  return <BaseNode {...props} icon={Bot} type="accent" />;
};

export default AssistantNode;