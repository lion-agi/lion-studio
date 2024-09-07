import React from 'react';
import { Button } from "@/common/components/ui/button";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  totalPages > 1 && (
    <div className="mt-8 flex justify-center">
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Previous
      </Button>
      <span className="mx-4 text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Next
      </Button>
    </div>
  )
);

export default Pagination;