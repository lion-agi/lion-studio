import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useApiData } from '@/features/dashboard/hooks';
import { timeRangeState, selectedModelState } from '@/features/dashboard/atoms';
import SummaryCards from '@/features/dashboard/components/SummaryCards';
import CostTrendChart from '@/features/dashboard/components/CostTrendChart';
import CostBreakdownChart from '@/features/dashboard/components/CostBreakdownChart';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart';
import RecentCallsTable from '@/features/dashboard/components/RecentCallsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { DownloadIcon, AlertTriangle, Info, Search } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const InfoModal = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
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
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useRecoilState(timeRangeState);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { data, isLoading, error } = useApiData(timeRange, selectedModel);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-100">Error</h3>
        <p className="mt-1 text-sm text-gray-400">{error.message || "An unknown error occurred"}</p>
      </div>
    );
  }

  const handleExportApiCalls = () => {
    // Implement export functionality here
    console.log('Exporting API calls...');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="bg-gray-800 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Costs</TabsTrigger>
            <TabsTrigger value="calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">API Calls</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-8">
              <SummaryCards data={data.summary} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CostTrendChart data={data.costTrend} />
                <PerformanceChart data={data.performance} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="mt-6">
            <div className="space-y-8">
              <SummaryCards data={data.summary} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CostTrendChart data={data.costTrend} />
                <CostBreakdownChart data={data.costBreakdown} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calls" className="mt-6">
            <div className="space-y-8">
              <SummaryCards data={data.summary} />
              {data.recentCalls && data.recentCalls.length > 0 ? (
                <>
                  <RecentCallsTable data={data.recentCalls} />
                  <div className="flex justify-end">
                    <Button onClick={handleExportApiCalls} className="bg-purple-600 hover:bg-purple-700 text-white">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      Export API Calls
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
                  <h3 className="mt-2 text-sm font-semibold text-gray-100">No API Calls</h3>
                  <p className="mt-1 text-sm text-gray-400">There are no recent API calls to display.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

// Path: src/features/dashboard/pages/Dashboard.jsx