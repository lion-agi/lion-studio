import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadList = ({ threads, onOpenModal }) => {
  return (
    <div className="space-y-4 px-6">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} onOpenModal={onOpenModal} />
      ))}
    </div>
  );
};

export default ThreadList;