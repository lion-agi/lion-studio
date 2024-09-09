import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';

const Note = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={StickyNote} 
      type="note"
      baseColor="#EAB308"
      gradientFrom="from-yellow-500/30"
      gradientTo="to-yellow-400/10"
    >
      Note
    </BaseNode>
  );
};

export default Note;
