import React, { useState } from 'react';
import { useApiData } from '@/features/dashboard/hooks';
import DashboardHeader from '@/features/dashboard/components/DashboardHeader';
import SummaryCards from '@/features/dashboard/components/SummaryCards';
import CostTrendChart from '@/features/dashboard/components/CostTrendChart';
import CostBreakdownChart from '@/features/dashboard/components/CostBreakdownChart';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart';
import RecentCallsTable from '@/features/dashboard/components/RecentCallsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Button } from "@/common/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { DownloadIcon, AlertTriangle } from 'lucide-react';

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
        <p>The Library is your central hub for monitoring and managing your project:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Overview: Overall stats of the project</li>
          <li>Costs: costs related stats for the project</li>
          <li>API Calls: provide detailed logs of recent API calls</li>
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);



const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [modelFilter, setModelFilter] = useState('all');
  const { data, isLoading, error } = useApiData(timeFilter, modelFilter);

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
    <div className="container mx-auto p-4">
      <DashboardHeader 
        timeFilter={timeFilter}
        modelFilter={modelFilter}
        onTimeFilterChange={setTimeFilter}
        onModelFilterChange={setModelFilter}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsInfoModalOpen(true)}
        className="text-gray-400 hover:text-gray-100"
      >
        <Info className="h-5 w-5" />
      </Button>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Overview</TabsTrigger>
          <TabsTrigger value="costs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Costs</TabsTrigger>
          <TabsTrigger value="calls" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">API Calls</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="mt-6">
            <SummaryCards data={data.summary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CostTrendChart data={data.costTrend} />
              <PerformanceChart data={data.performance} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="costs">
          <div className="mt-6">
            <SummaryCards data={data.summary} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CostTrendChart data={data.costTrend} />
              <CostBreakdownChart data={data.costBreakdown} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="calls">
          <div className="mt-6">
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
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No API Calls</h3>
                <p className="mt-1 text-sm text-gray-500">There are no recent API calls to display.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;