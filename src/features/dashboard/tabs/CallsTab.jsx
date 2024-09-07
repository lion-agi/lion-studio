import React from 'react';
import RecentCallsTable from '../RecentCallsTable';

const CallsTab = ({ data }) => (
  <RecentCallsTable calls={data.recentCalls} />
);

export default CallsTab;