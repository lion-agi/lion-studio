import React from 'react';

const NodeContent = ({ data }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm"><strong>Label:</strong> {data.label || 'Unnamed Node'}</p>
      <p className="text-sm"><strong>Description:</strong> {data.description || 'No description'}</p>
      {data.additionalInfo && (
        <div className="text-sm">
          <strong>Additional Info:</strong>
          <pre className="mt-1 whitespace-pre-wrap">{JSON.stringify(data.additionalInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NodeContent;