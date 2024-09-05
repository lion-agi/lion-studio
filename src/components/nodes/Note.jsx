import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';

let noteCounter = 0;

const Note = ({ data, ...props }) => {
  const nodeLabel = data.label || `unnamed${++noteCounter}`;
  const getDisplayLabel = (label) => `Note: ${label}`;
  
  return (
    <BaseNode 
      {...props}
      data={{
        ...data,
        label: nodeLabel,
        getDisplayLabel: getDisplayLabel,
        onSave: (id, newData) => {
          // Update the node data when saved
          if (props.data && typeof props.data.onSave === 'function') {
            props.data.onSave(id, {
              ...newData,
              label: newData.label || nodeLabel,
            });
          }
        },
      }}
      icon={StickyNote} 
      type="note"
      baseColor="yellow"
      gradientFrom="from-yellow-400/20"
      gradientTo="to-yellow-300/10"
      iconColor="text-yellow-600"
    >
      {getDisplayLabel(nodeLabel)}
    </BaseNode>
  );
};

export default Note;