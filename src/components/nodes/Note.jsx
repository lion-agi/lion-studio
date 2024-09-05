import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';

const Note = (props) => {
  return (
    <BaseNode 
      {...props} 
      icon={StickyNote} 
      type="Note"
      baseColor="yellow"
      gradientFrom="from-yellow-400/20"
      gradientTo="to-yellow-300/10"
      iconColor="text-yellow-600"
      nodeData={{
        title: props.data.title || 'Note',
        content: props.data.content || '',
        tags: props.data.tags || []
      }}
    >
      Note
    </BaseNode>
  );
};

export default Note;