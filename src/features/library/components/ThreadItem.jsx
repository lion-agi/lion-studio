import React from 'react';
import { Button } from "@/common/components/ui/button";
import { MoreHorizontal, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/common/components/ui/dropdown-menu";

const ThreadItem = ({ thread, onOpenModal }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-start">
        <div className="flex-grow cursor-pointer" onClick={() => onOpenModal(thread)}>
          <h3 className="text-lg font-semibold mb-1">{thread.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{thread.summary || 'No summary available'}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>{new Date(thread.created_at).toLocaleDateString()}</span>
            {thread.topic && (
              <>
                <span className="mx-2">•</span>
                <span>{thread.topic}</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => console.log('Edit thread')}>Edit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log('Delete thread')}>Delete</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => console.log('Share thread')}>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;

// Path: src/features/library/components/ThreadItem.jsx