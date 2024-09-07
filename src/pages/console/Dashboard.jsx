import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
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
      <SummaryCards data={data.summary} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CostTrendChart data={data.costTrend} />
        <PerformanceChart data={data.performance} />
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
      <Card>
        <CardHeader>
          <CardTitle>Cost Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{formatCurrency(data.summary.totalCost)}</div>
          <p className="text-sm text-gray-400">
            {formatPercentage(data.summary.costChange)} from last period
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CostTrendChart data={data.costTrend} />
        <CostBreakdownChart data={data.costBreakdown} />
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.summary.totalCalls)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(data.summary.callsChange)} from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.avgResponseTime} ms</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(data.summary.responseTimeChange)} from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(data.summary.errorRate)}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(data.summary.errorRateChange)} from last period
            </p>
          </CardContent>
        </Card>
      </div>
      <RecentCallsTable data={data.recentCalls} />
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