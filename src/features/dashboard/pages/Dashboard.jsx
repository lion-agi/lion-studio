import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { Calendar } from "@/common/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { useApiData } from '../hooks/useApiData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMetric, setSelectedMetric] = useState('totalCost');
  const [timeRange, setTimeRange] = useState('7d');
  const [customDateRange, setCustomDateRange] = useState({ from: null, to: null });

  const { data, isLoading, error } = useApiData(timeRange, customDateRange);

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    if (value !== 'custom') {
      setCustomDateRange({ from: null, to: null });
    }
  };

  const handleCustomDateChange = (range) => {
    if (range.from && range.to) {
      setCustomDateRange(range);
      setTimeRange('custom');
    }
  };

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error loading dashboard data: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          {timeRange === 'custom' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDateRange.from ? (
                    customDateRange.to ? (
                      <>
                        {format(customDateRange.from, "LLL dd, y")} -{" "}
                        {format(customDateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(customDateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={customDateRange}
                  onSelect={handleCustomDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calls">Calls</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default Dashboard;