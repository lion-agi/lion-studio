import React from 'react';
import ThreadItem from './ThreadItem';

const ThreadList = ({ threads }) => {
  return (
    <div className="space-y-4 px-6">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;