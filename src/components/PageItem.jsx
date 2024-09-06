import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, BookOpen, Trash2, Edit, FolderPlus } from 'lucide-react';

const PageItem = ({ page, onOpenModal, onDelete, onEdit, onAddToCollection }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{page.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{page.content}</p>
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
          <Button variant="ghost" size="sm" onClick={() => onOpenModal(page)}>
            <BookOpen className="h-4 w-4" />
          </Button>
          <div className="relative" ref={optionsRef}>
            <Button variant="ghost" size="sm" onClick={() => setShowOptions(!showOptions)}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => { onDelete(page.id); setShowOptions(false); }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => { onEdit(page.id); setShowOptions(false); }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => { onAddToCollection(page.id); setShowOptions(false); }}
                  >
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Add to Collection
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageItem;