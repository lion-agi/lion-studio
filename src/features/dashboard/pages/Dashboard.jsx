import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { useDashboardData } from '../hooks/useDashboardData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const {
    dateRange,
    handleDateRangeChange,
    stats,
    isLoading,
    error
  } = useDashboardData();

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error loading dashboard data: {error.message}</div>;

  return (
    <div className="container mx-auto p-8 space-y-6">
      <DashboardHeader 
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">API Calls</TabsTrigger>
          <TabsTrigger value="costs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SummaryCards data={stats.summary} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <CostTrendChart data={stats.costTrend} />
            <CostBreakdownChart data={stats.costByModel} />
          </div>
          <RecentCallsTable calls={stats.recentCalls} />
        </TabsContent>

        <TabsContent value="calls">
          {/* Implement Calls tab content */}
        </TabsContent>

        <TabsContent value="costs">
          {/* Implement Costs tab content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;