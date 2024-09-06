import React from 'react';
import PageItem from './PageItem';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const PageList = ({ pages, onOpenModal, onDelete, onEdit, onCreateNew }) => {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Pages</h2>
        <Button onClick={onCreateNew} className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" /> Create New Page
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {pages.map((page) => (
          <PageItem
            key={page.id}
            page={page}
            onOpenModal={onOpenModal}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default PageList;