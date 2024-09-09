import React, { useState } from 'react';
import ThreadItem from './ThreadItem';
import Pagination from './Pagination';

const ThreadList = ({ threads, onOpenModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedThreads = threads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4 px-6">
      {paginatedThreads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} onOpenModal={onOpenModal} />
      ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(threads.length / itemsPerPage)}
      />
    </div>
  );
};

export default ThreadList;

// Path: src/features/library/components/ThreadList.jsx