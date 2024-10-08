import React from 'react';
import RecentCallsTable from '../components/RecentCallsTable';

const CallsTab = ({ data }) => (
  <RecentCallsTable calls={data.recentCalls} />
);

export default CallsTab;
