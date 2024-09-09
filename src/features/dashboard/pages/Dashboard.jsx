import React, { useState } from 'react';
import { useApiData } from '../hooks/useApiData';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { DateRangePicker } from '../components/DateRangePicker';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ preset: '7d' });
  const [selectedMetric, setSelectedMetric] = useState('totalCost');
  const { data, isLoading, error } = useApiData(dateRange);

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error loading dashboard data: {error.message}</div>;

  const summary = data ? {
    totalCost: data[data.length - 1].cumulativeCost,
    totalCalls: data[data.length - 1].cumulativeCalls,
    avgResponseTime: data[data.length - 1].avgResponseTime,
    errorRate: data.filter(call => call.error).length / data.length,
  } : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
      <SummaryCards data={summary} onMetricClick={handleMetricClick} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CostTrendChart data={data} selectedMetric={selectedMetric} />
        <CostBreakdownChart data={data} />
      </div>
      <RecentCallsTable calls={data?.slice(-10).reverse()} />
    </div>
  );
};

export default Dashboard;