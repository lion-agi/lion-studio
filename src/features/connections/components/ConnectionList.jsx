import React from 'react';
import ConnectionItem from './ConnectionItem';

const ConnectionList = ({ connections, onOpenModal }) => {
  if (!connections || Object.keys(connections).length === 0) {
    return <div>No connections available.</div>;
  }

  return (
    <div className="space-y-12">
      {Object.entries(connections).map(([category, sources]) => (
        <div key={category} className="space-y-6">
          <h3 className="text-lg font-semibold mb-6 capitalize group-name">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(sources) ? sources.map((connection) => (
              <ConnectionItem key={connection.id} connection={connection} onOpenModal={onOpenModal} />
            )) : (
              <div>Invalid connection format for {category}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionList;