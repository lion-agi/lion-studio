import React from 'react';
import BaseNode from './BaseNode';
import { Bot } from 'lucide-react';
import { Handle, Position } from 'reactflow';

const AssistantNode = (props) => {
  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        style={{ left: '-8px', top: '50%', transform: 'translateY(-50%)' }}
      />
      <BaseNode {...props} icon={Bot} type="assistant" label="Assistant" />
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: '-8px', top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
};

export default AssistantNode;