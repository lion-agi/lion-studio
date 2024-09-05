import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from 'lucide-react';

const ThreadItem = ({ thread }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1">{thread.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{thread.content}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>{thread.createdAt}</span>
            <span className="mx-2">•</span>
            <span>{thread.collection}</span>
            <span className="mx-2">•</span>
            <span>{thread.views} views</span>
            <span className="mx-2">•</span>
            <span>{thread.timeToRead}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;