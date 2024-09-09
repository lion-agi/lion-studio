import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/common/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { Search, Info } from 'lucide-react';
import { useToast } from "@/common/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import PerformanceChart from '../components/PerformanceChart';
import { useApiData } from '../hooks/useApiData';
import SettingsTab from '../components/SettingsTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedModel, setSelectedModel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { data, isLoading, error } = useApiData(timeRange, selectedModel);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [dashboardSettings, setDashboardSettings] = useState({
    showCostTrend: true,
    showCostBreakdown: true,
    showPerformanceMetrics: true,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleExportData = () => {
    console.log('Exporting data...');
    toast({
      title: "Export Started",
      description: "Your data export has begun. You'll be notified when it's ready.",
    });
  };

  const handleSettingsChange = (newSettings) => {
    setDashboardSettings(newSettings);
    toast({
      title: "Settings Updated",
      description: "Your dashboard settings have been saved.",
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsInfoModalOpen(true)}
            className="text-gray-400 hover:text-gray-100"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex space-x-4 items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
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
            <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
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
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 mb-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="costs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Costs</TabsTrigger>
          <TabsTrigger value="calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">API Calls</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <SummaryCards data={data.summary} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dashboardSettings.showCostTrend && <CostTrendChart data={data.costTrend} />}
            {dashboardSettings.showPerformanceMetrics && <PerformanceChart data={data.performance} />}
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-8">
          <SummaryCards data={data.summary} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dashboardSettings.showCostTrend && <CostTrendChart data={data.costTrend} />}
            {dashboardSettings.showCostBreakdown && <CostBreakdownChart data={data.costBreakdown} />}
          </div>
        </TabsContent>

        <TabsContent value="calls" className="space-y-8">
          <SummaryCards data={data.summary} />
          {data.recentCalls && data.recentCalls.length > 0 ? (
            <>
              <RecentCallsTable data={data.recentCalls} />
              <div className="flex justify-end">
                <Button onClick={handleExportData} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Export API Calls
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <h3 className="mt-2 text-sm font-semibold text-gray-100">No API Calls</h3>
              <p className="mt-1 text-sm text-gray-400">There are no recent API calls to display.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-8">
          <SettingsTab
            settings={dashboardSettings}
            onSettingsChange={handleSettingsChange}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
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