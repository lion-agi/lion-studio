import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trash2, Edit, FolderPlus } from 'lucide-react';

const PageItem = ({ page, onOpenModal, onDelete, onEdit, onAddToCollection }) => {
  const handleAction = (action) => {
    if (action) {
      action(page.id);
    } else {
      console.warn(`${action.name} function not provided to PageItem`);
    }
  };

  return (
    <Card className="h-full bg-navy-900 text-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{page.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{page.content}</p>
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <span>{page.createdAt}</span>
          <span className="mx-2">•</span>
          <span>{page.collection}</span>
          <span className="mx-2">•</span>
          <span>{page.views} views</span>
          <span className="mx-2">•</span>
          <span>{page.timeToRead}</span>
        </div>
        <div className="flex justify-end space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onOpenModal(page)}
            className="text-gray-400 hover:text-gray-200 hover:bg-navy-700 transition-colors duration-200"
          >
            <BookOpen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-200 hover:bg-navy-700 transition-colors duration-200"
            onClick={() => handleAction(onDelete)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-200 hover:bg-navy-700 transition-colors duration-200"
            onClick={() => handleAction(onEdit)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-200 hover:bg-navy-700 transition-colors duration-200"
            onClick={() => handleAction(onAddToCollection)}
          >
            <FolderPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageItem;