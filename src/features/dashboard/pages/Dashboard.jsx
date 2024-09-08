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
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load dashboard data: {error.message}</AlertDescription>
      </Alert>
    );
  }

  const handleExportApiCalls = () => {
    if (!data || !data.recentCalls || data.recentCalls.length === 0) {
      console.error('No data available for export');
      return;
    }

    const csvContent = [
      ['Timestamp', 'Provider', 'Model', 'Endpoint', 'Method', 'Base URL', 'Tokens', 'Cost', 'Response Time'],
      ...data.recentCalls.map(call => [
        call.created_at,
        call.provider,
        call.model,
        call.endpoint,
        call.method,
        call.base_url,
        call.tokens,
        call.cost,
        call.response_time
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'api_calls_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-100 mr-4">Dashboard</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsInfoModalOpen(true)}
              className="text-gray-400 hover:text-gray-100"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
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
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Overview</TabsTrigger>
            <TabsTrigger value="costs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Costs</TabsTrigger>
            <TabsTrigger value="calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">API Calls</TabsTrigger>
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
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
