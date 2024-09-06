import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from 'lucide-react';

const MAX_CONTENT_LENGTH = 100; // Maximum characters for content

const ThreadItem = ({ thread, onOpenModal }) => {
  const truncateContent = (content) => {
    if (content.length <= MAX_CONTENT_LENGTH) return content;
    return content.substr(0, MAX_CONTENT_LENGTH) + '...';
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-md p-3 transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex-grow cursor-pointer" onClick={() => onOpenModal(thread)}>
          <h3 className="text-lg font-semibold mb-1 text-purple-300">{thread.title}</h3>
          <p className="text-sm text-gray-300 mb-2 min-h-[2.5em]">{truncateContent(thread.content)}</p>
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <span>{thread.createdAt}</span>
            <span>•</span>
            <span>{thread.collection}</span>
            <span>•</span>
            <span>{thread.views} views</span>
            <span>•</span>
            <span>{thread.timeToRead}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-600">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;