import React from 'react';

const AccessLogs = ({ logs }) => (
  <div className="space-y-4 mt-8">
    <h2 className="text-2xl font-semibold">Access Logs</h2>
    {logs.map((log) => (
      <div key={log.id} className="flex items-center space-x-4">
        <span>{log.timestamp}</span>
        <span>{log.action}</span>
        <span>{log.user}</span>
      </div>
    ))}
  </div>
);

export default AccessLogs;

// Path: src/common/components/AccesLogs.jsx