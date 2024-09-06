import React from 'react';
import { FolderPlus } from 'lucide-react';

const EmptyState = ({ message, icon: Icon = FolderPlus }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-navy-800 rounded-lg">
      <Icon className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-300 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;