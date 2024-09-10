import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { DateRangePicker } from "@/common/components/ui/date-range-picker";
import { useDashboardData } from '../hooks/useDashboardData';

const Dashboard = () => {
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {}} // Add info modal functionality here
            className="text-gray-400 hover:text-gray-100"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <DateRangePicker
            value={dateRange}
            onValueChange={handleDateRangeChange}
          />
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search workflows..."
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      <SummaryCards data={stats.summary} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CostTrendChart data={stats.costTrend} />
        <CostBreakdownChart data={stats.costByModel} />
      </div>
      
      <RecentCallsTable calls={stats.recentCalls} />
    </div>
  );
};

export default Dashboard;