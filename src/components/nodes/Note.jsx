import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';


const Note = (props) => {

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
      {getDisplayLabel(nodeLabel)}
    </BaseNode>
  );
};

export default Note;