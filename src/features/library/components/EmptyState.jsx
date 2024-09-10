import React from 'react';

const EmptyState = ({ message, icon: Icon, action }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-800 rounded-lg p-6 text-center">
      <Icon className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-300 text-lg mb-4">{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;