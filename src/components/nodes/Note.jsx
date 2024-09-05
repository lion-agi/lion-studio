import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';

const Note = ({ data, ...props }) => {
  const nodeTitle = `Note: ${data.label || 'Untitled'}`;
  
  return (
    <BaseNode 
      {...props}
      data={{
        ...data,
        label: nodeTitle
      }}
      icon={StickyNote} 
      type="note"
      baseColor="yellow"
      gradientFrom="from-yellow-400/20"
      gradientTo="to-yellow-300/10"
      iconColor="text-yellow-600"
    >
      {nodeTitle}
    </BaseNode>
  );
};

export default Note;