import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';

const NoteNode = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={StickyNote} 
      type="note"
      baseColor="yellow"
      gradientFrom="from-yellow-400/20"
      gradientTo="to-yellow-300/10"
      iconColor="text-yellow-600"
    >
      Note
    </BaseNode>
  );
};

export default NoteNode;