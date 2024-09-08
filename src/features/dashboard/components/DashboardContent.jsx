import React from 'react';
import { useRecoilValue } from 'recoil';
import { apiDataState } from '../atoms';
import SummaryCards from './SummaryCards';
import CostTrendChart from './CostTrendChart';
import CostBreakdownChart from './CostBreakdownChart';
import RecentCallsTable from './RecentCallsTable';

const LoadingSpinner = () => <div>Loading...</div>;
const ErrorMessage = ({ error }) => <div className="text-red-500">Error: {error.message}</div>;

const DashboardContent = () => {
  const { data, isLoading, error } = useRecoilValue(apiDataState);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SummaryCards data={data.summary} />
      <CostTrendChart data={data.costTrend} />
      <CostBreakdownChart data={data.costBreakdown} />
      <RecentCallsTable data={data.recentCalls} />
    </div>
  );
};

export default DashboardContent;
