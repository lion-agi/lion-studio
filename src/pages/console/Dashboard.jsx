import React, { useState, useCallback, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  const [isTimeout, setIsTimeout] = useState(false);

  const { data, isLoading, error, refetch } = useApiData(timeFilter, modelFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsTimeout(true);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleTimeFilterChange = useCallback((value) => {
    setTimeFilter(value);
    refetch();
  }, [refetch]);

  const handleModelFilterChange = useCallback((value) => {
    setModelFilter(value);
    refetch();
  }, [refetch]);

  if (isLoading && !isTimeout) return <LoadingSpinner />;
  if (isTimeout) return <ErrorFallback error={{ message: "Loading timed out. Please try again." }} />;
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
              <DashboardHeader 
                timeFilter={timeFilter}
                modelFilter={modelFilter}
                onTimeFilterChange={handleTimeFilterChange}
                onModelFilterChange={handleModelFilterChange}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
              />

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