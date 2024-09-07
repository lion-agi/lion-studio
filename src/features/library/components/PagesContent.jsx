import React from 'react';
import { Button } from "@/common/components/ui/button";
import { PlusCircle, FileText } from 'lucide-react';
import PageItem from './PageItem';
import EmptyState from './EmptyState';

const PagesContent = ({ pages, handleOpenPageModal, handleDeletePage, handleEditPage, handleCreateNewPage }) => (
  <>
    {pages && pages.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <PageItem
            key={page.id}
            page={page}
            onOpenModal={handleOpenPageModal}
            onDelete={handleDeletePage}
            onEdit={handleEditPage}
          />
        ))}
        <Button
          onClick={handleCreateNewPage}
          className="h-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-200 border-2 border-dashed border-gray-600 hover:border-purple-500 transition-all duration-300"
        >
          <PlusCircle className="h-8 w-8 mr-2" />
          Create New Page
        </Button>
      </div>
    ) : (
      <EmptyState message="No pages found. Create your first page!" icon={FileText} />
    )}
  </>
);

export default PagesContent;