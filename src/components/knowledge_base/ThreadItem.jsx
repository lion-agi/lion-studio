import React from 'react';
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from 'lucide-react';

const ThreadItem = ({ thread, onOpenModal }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex-grow cursor-pointer" onClick={() => onOpenModal(thread)}>
          <h3 className="text-lg font-semibold mb-1 text-purple-300">{thread.title}</h3>
          <p className="text-sm text-gray-300 mb-2 bg-gray-900 bg-opacity-50 p-2 rounded-md">{thread.content}</p>
          <div className="flex items-center text-xs text-gray-400">
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