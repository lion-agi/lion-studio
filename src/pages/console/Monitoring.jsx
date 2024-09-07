import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { InfoIcon, DownloadIcon } from 'lucide-react';
import DashboardHeader from '@/features/monitoring/components/DashboardHeader';
import SummaryCards from '@/features/monitoring/components/SummaryCards';
import CostTrendChart from '@/features/monitoring/components/CostTrendChart';
import CostBreakdownChart from '@/features/monitoring/components/CostBreakdownChart';
import PerformanceChart from '@/features/monitoring/components/PerformanceChart';
import RecentCallsTable from '@/features/monitoring/components/RecentCallsTable';
import { useApiData } from '@/features/monitoring/hooks';
import { formatCurrency, formatNumber, formatPercentage } from '@/features/monitoring/utils';

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
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const Monitoring = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <div className="container mx-auto p-4 space-y-6">
            <DashboardHeader />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="costs">Costs</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="calls">API Calls</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <OverviewTab />
              </TabsContent>
              <TabsContent value="costs">
                <CostsTab />
              </TabsContent>
              <TabsContent value="performance">
                <PerformanceTab />
              </TabsContent>
              <TabsContent value="calls">
                <CallsTab />
              </TabsContent>
            </Tabs>
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
    <div className="space-y-6">
      <SummaryCards data={data.summary} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Overview</CardTitle>
          <CardDescription>Total cost for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{formatCurrency(data.summary.totalCost)}</div>
          <p className="text-sm text-muted-foreground">
            {formatPercentage(data.summary.costChange)} from last period
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CostTrendChart data={data.costTrend} />
        <CostBreakdownChart data={data.costBreakdown} />
      </div>
    </div>
  );
};

const PerformanceTab = () => {
  const { data, isLoading, error } = useApiData();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{data.summary.avgResponseTime} ms</div>
            <p className="text-sm text-muted-foreground">
              {formatPercentage(data.summary.responseTimeChange)} from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{formatPercentage(data.summary.errorRate)}</div>
            <p className="text-sm text-muted-foreground">
              {formatPercentage(data.summary.errorRateChange)} from last period
            </p>
          </CardContent>
        </Card>
      </div>
      <PerformanceChart data={data.performance} />
    </div>
  );
};

const CallsTab = () => {
  const { data, isLoading, error } = useApiData();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Calls Overview</CardTitle>
          <CardDescription>Total calls for the selected period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{formatNumber(data.summary.totalCalls)}</div>
          <p className="text-sm text-muted-foreground">
            {formatPercentage(data.summary.callsChange)} from last period
          </p>
        </CardContent>
      </Card>
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

export default Monitoring;