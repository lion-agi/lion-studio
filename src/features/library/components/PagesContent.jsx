import React from 'react';
import { Button } from "@/common/components/ui/button";
import { PlusCircle, FileText, Eye, Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from "@/common/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import EmptyState from './EmptyState';

const PageItem = ({ page, onOpenModal, onDelete, onEdit }) => {
  return (
    <Card className="bg-gray-800 text-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out animate-fade-in">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-purple-300">{page.title}</h3>
        <p className="text-sm text-gray-300 mb-4 bg-navy-700 bg-opacity-50 p-2 rounded-md">
          {page.content.substring(0, 100)}...
        </p>
        <div className="space-y-1 text-xs text-gray-400">
          <p><strong>Created:</strong> {new Date(page.created_at).toLocaleDateString()}</p>
          <p><strong>Views:</strong> {page.views}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onOpenModal(page)} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onEdit(page.id)} className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onDelete(page.id)} className="text-red-300 hover:text-red-100 hover:bg-red-800">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

const PagesContent = ({ pages, handleOpenPageModal, handleDeletePage, handleEditPage }) => (
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

export default PagesContent;