import React from 'react';
import BaseNode from './BaseNode';
import { StickyNote } from 'lucide-react';
import { useAddNode, useUpdateNode, useDeleteNode } from '@/integrations/supabase/hooks/nodes';

let noteCounter = 0;

const Note = ({ data, ...props }) => {
  const addNode = useAddNode();
  const updateNode = useUpdateNode();
  const deleteNode = useDeleteNode();

  const nodeLabel = data.label || `unnamed${++noteCounter}`;
  const getDisplayLabel = (label) => `Note: ${label}`;
  
  const handleSave = (id, newData) => {
    if (id) {
      updateNode.mutate({ id, ...newData });
    } else {
      addNode.mutate({ ...newData, type: 'note', user_id: data.user_id });
    }
  };

  const handleDelete = (id) => {
    deleteNode.mutate(id);
  };

  return (
    <BaseNode 
      {...props}
      data={{
        ...data,
        label: nodeLabel,
        getDisplayLabel: getDisplayLabel,
        onSave: handleSave,
        onDelete: handleDelete,
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