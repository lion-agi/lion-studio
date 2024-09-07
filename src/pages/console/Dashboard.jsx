import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Button } from "@/common/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { InfoIcon, DownloadIcon, Activity, Clock, AlertTriangle } from 'lucide-react';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import SummaryCards from '@/features/dashboard/components/SummaryCards';
import CostTrendChart from '@/features/dashboard/components/CostTrendChart';
import CostBreakdownChart from '@/features/dashboard/components/CostBreakdownChart';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart';
import RecentCallsTable from '@/features/dashboard/components/RecentCallsTable';
import { useApiData } from '@/features/dashboard/hooks';
import { formatCurrency, formatNumber, formatPercentage } from '@/features/dashboard/utils';

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
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto p-6 space-y-8">
              <DashboardHeader />
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
                  <TabsTrigger value="costs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Costs</TabsTrigger>
                  <TabsTrigger value="calls" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">API Calls</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <OverviewTab />
                </TabsContent>
                <TabsContent value="costs">
                  <CostsTab />
                </TabsContent>
                <TabsContent value="calls">
                  <CallsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ErrorBoundary>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const OverviewTab = () => {
  const { data, isLoading, error } = useApiData();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="space-y-8">
      <SummaryCards data={data?.summary || {}} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CostTrendChart data={data?.costTrend || []} />
        <PerformanceChart data={data?.performance || []} />
      </div>
    </div>
  );
};

const CostsTab = () => {
  const { data, isLoading, error } = useApiData();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="space-y-8">
      <SummaryCards data={{
        totalCost: data?.summary?.totalCost,
        costChange: data?.summary?.costChange,
      }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CostTrendChart data={data?.costTrend || []} />
        <CostBreakdownChart data={data?.costBreakdown || []} />
      </div>
    </div>
  );
};

const CallsTab = () => {
  const { data, isLoading, error } = useApiData();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="space-y-8">
      <SummaryCards data={{
        totalCalls: data?.summary?.totalCalls,
        callsChange: data?.summary?.callsChange,
        avgResponseTime: data?.summary?.avgResponseTime,
        responseTimeChange: data?.summary?.responseTimeChange,
        errorRate: data?.summary?.errorRate,
        errorRateChange: data?.summary?.errorRateChange,
      }} />
      <RecentCallsTable data={data?.recentCalls || []} />
      <div className="flex justify-end">
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export API Calls
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;