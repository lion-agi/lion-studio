import React from 'react';
import RecentCallsTable from '../components/RecentCallsTable';
import { useApiData } from '../hooks/useApiData';

const CallsTab = () => {
  const { data, isLoading, error } = useApiData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent API Calls</h2>
      <RecentCallsTable calls={data.recentCalls} />
    </div>
  );
};

export default CallsTab;