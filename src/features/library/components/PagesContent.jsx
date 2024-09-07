import React from 'react';
import { Button } from "@/common/components/ui/button";
import { PlusCircle, FileText } from 'lucide-react';
import PageItem from './PageItem';
import EmptyState from './EmptyState';
import { Card, CardContent } from "@/common/components/ui/card";

const PlaceholderCard = () => (
  <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-4">
        <FileText className="h-6 w-6 text-gray-400" />
      </div>
      <p className="text-gray-400 text-sm text-center">Placeholder Page</p>
    </CardContent>
  </Card>
);

const PagesContent = ({ pages, handleOpenPageModal, handleDeletePage, handleEditPage }) => {
  const placeholderCount = Math.max(0, 6 - (pages?.length || 0));
  const placeholders = Array(placeholderCount).fill(null);

  return (
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
          {placeholders.map((_, index) => (
            <PlaceholderCard key={`placeholder-${index}`} />
          ))}
          <Button
            onClick={() => handleOpenPageModal(null)}
            className="h-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-200"
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
};

export default PagesContent;