import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';

let noteCounter = 0;

const Note = ({ data, ...props }) => {
  const nodeLabel = data.label || `unnamed${++noteCounter}`;
  const nodeTitle = `Note: ${nodeLabel}`;
  
  return (
    <BaseNode 
      {...props}
      data={{
        ...data,
        label: nodeTitle,
        originalLabel: nodeLabel,
        isLabelEditable: true,
        isTypeEditable: false
      }}
      icon={StickyNote} 
      type="note"
      baseColor="yellow"
      gradientFrom="from-yellow-500/30"
      gradientTo="to-yellow-400/10"
    >
      {nodeTitle}
    </BaseNode>
  );
};

export default Note;

// Path: src/common/components/nodes/Note.jsx