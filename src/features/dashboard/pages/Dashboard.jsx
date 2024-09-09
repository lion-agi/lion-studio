import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/common/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Search, Info } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import SummaryCards from '@/features/dashboard/components/SummaryCards';
import CostTrendChart from '@/features/dashboard/components/CostTrendChart';
import CostBreakdownChart from '@/features/dashboard/components/CostBreakdownChart';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart';
import RecentCallsTable from '@/features/dashboard/components/RecentCallsTable';
import { useApiData } from '@/features/dashboard/hooks';
import SettingsTab from '../components/SettingsTab';
import useSettingsStore from '@/store/settingsSlice';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedModel, setSelectedModel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { data, isLoading, error } = useApiData(timeRange, selectedModel);
  const navigate = useNavigate();
  const { theme, autoRefreshInterval } = useSettingsStore();

  useEffect(() => {
    // Apply theme
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    if (autoRefreshInterval > 0) {
      const intervalId = setInterval(() => {
        // Trigger data refresh here
      }, autoRefreshInterval * 1000);

      return () => clearInterval(intervalId);
    }
  }, [autoRefreshInterval]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mb-6 md:mb-0 text-foreground mr-4">Dashboard</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsInfoModalOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex space-x-4 items-center">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="gpt-3">GPT-3</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full md:w-80">
              <Input
                type="text"
                placeholder="Search dashboard..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="calls">API Calls</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-8">
              <SummaryCards data={data.summary} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CostTrendChart data={data.costTrend} />
                <PerformanceChart data={data.performance} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costs">
            <div className="space-y-8">
              <SummaryCards data={data.summary} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CostTrendChart data={data.costTrend} />
                <CostBreakdownChart data={data.costBreakdown} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calls">
            <div className="space-y-8">
              <SummaryCards data={data.summary} />
              {data.recentCalls && data.recentCalls.length > 0 ? (
                <RecentCallsTable data={data.recentCalls} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent API calls to display.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dashboard Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>The Dashboard provides an overview of your project's performance and usage:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>View total costs and API calls</li>
              <li>Monitor response times and error rates</li>
              <li>Analyze trends and performance metrics</li>
            </ul>
            <p className="mt-4">Use the filters to adjust the time range and model selection, and use the search bar to find specific information.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;