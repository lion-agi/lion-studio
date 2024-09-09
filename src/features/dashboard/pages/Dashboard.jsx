import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { useApiData } from '../hooks';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import SettingsTab from '../components/SettingsTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('totalCost');
  const { data, isLoading, error } = useApiData();

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error loading dashboard data: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SummaryCards data={data.summary} onMetricClick={handleMetricClick} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <CostTrendChart data={data.costTrend} selectedMetric={selectedMetric} />
            <CostBreakdownChart data={data.costBreakdown} />
          </div>
          <RecentCallsTable calls={data.recentCalls} />
        </TabsContent>

        <TabsContent value="calls">
          <RecentCallsTable calls={data.recentCalls} />
        </TabsContent>

        <TabsContent value="costs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CostTrendChart data={data.costTrend} selectedMetric={selectedMetric} />
            <CostBreakdownChart data={data.costBreakdown} />
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;