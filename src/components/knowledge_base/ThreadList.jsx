import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadList = ({ threads, onOpenModal }) => {
  // Check if threads is undefined or not an array
  if (!threads || !Array.isArray(threads)) {
    return <div>No threads available</div>;
  }

  return (
    <div className="space-y-4 px-6">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
};

export default ThreadList;