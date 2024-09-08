import React, { useState, useCallback } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Button } from "@/common/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { InfoIcon, DownloadIcon, Activity, Clock, AlertTriangle, Search } from 'lucide-react';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import SummaryCards from '@/features/dashboard/components/SummaryCards';
import CostTrendChart from '@/features/dashboard/components/CostTrendChart';
import CostBreakdownChart from '@/features/dashboard/components/CostBreakdownChart';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart';
import RecentCallsTable from '@/features/dashboard/components/RecentCallsTable';
import { useApiData } from '@/features/dashboard/hooks';
import { formatCurrency, formatNumber } from '@/features/dashboard/utils';

const queryClient = new QueryClient();

const ErrorFallback = ({ error }) => (
  <Alert variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      An error occurred: {error.message}
    </AlertDescription>
  </Alert>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [modelFilter, setModelFilter] = useState('all');

  const { data, isLoading, error, refetch } = useApiData(timeFilter, modelFilter);

  const handleTimeFilterChange = useCallback((value) => {
    setTimeFilter(value);
    refetch();
  }, [refetch]);

  const handleModelFilterChange = useCallback((value) => {
    setModelFilter(value);
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  const filteredData = {
    ...data,
    recentCalls: data?.recentCalls?.filter(call => 
      call.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.model.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []
  };

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto p-8 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100">Dashboard</h1>
                <div className="flex space-x-4 items-center">
                  <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
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
                  <Select value={modelFilter} onValueChange={handleModelFilterChange}>
                    <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Models</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
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
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
                  <TabsTrigger value="costs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Costs</TabsTrigger>
                  <TabsTrigger value="calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">API Calls</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <OverviewTab data={filteredData} />
                </TabsContent>
                <TabsContent value="costs">
                  <CostsTab data={filteredData} />
                </TabsContent>
                <TabsContent value="calls">
                  <CallsTab data={filteredData} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ErrorBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const OverviewTab = ({ data }) => (
  <div className="space-y-8">
    <SummaryCards data={data.summary} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <CostTrendChart data={data.costTrend} />
      <PerformanceChart data={data.performance} />
    </div>
  </div>
);

const CostsTab = ({ data }) => (
  <div className="space-y-8">
    <SummaryCards data={data.summary} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <CostTrendChart data={data.costTrend} />
      <CostBreakdownChart data={data.costBreakdown} />
    </div>
  </div>
);

const CallsTab = ({ data }) => {
  const handleExportApiCalls = () => {
    if (!data || !data.recentCalls) {
      console.error('No data available for export');
      return;
    }

    const csvContent = [
      ['Timestamp', 'Provider', 'Model', 'Endpoint', 'Method', 'Base URL', 'Tokens', 'Cost', 'Response Time'],
      ...data.recentCalls.map(call => [
        call.timestamp,
        call.provider,
        call.model,
        call.endpoint,
        call.method,
        call.baseUrl,
        call.tokens,
        call.cost,
        call.responseTime
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
    <div className="space-y-8">
      <SummaryCards data={data.summary} />
      <RecentCallsTable data={data.recentCalls} />
      <div className="flex justify-end">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleExportApiCalls}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export API Calls
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;