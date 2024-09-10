import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useApiData } from '@/features/dashboard/hooks';
import { timeRangeState, selectedModelState } from '@/features/dashboard/atoms';
import SummaryCards from '@/features/dashboard/components/SummaryCards';
import CostTrendChart from '@/features/dashboard/components/CostTrendChart';
import CostBreakdownChart from '@/features/dashboard/components/CostBreakdownChart';
import PerformanceChart from '@/features/dashboard/components/PerformanceChart';
import RecentCallsTable from '@/features/dashboard/components/RecentCallsTable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { DownloadIcon, AlertTriangle, Info } from 'lucide-react';
import useCSVExport from '../useCSVExport';

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
        <p className="mt-4">Use the filters to adjust the time range and model selection for more detailed insights.</p>
      </div>
    </DialogContent>
  </Dialog>
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useRecoilState(timeRangeState);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { data, isLoading, error } = useApiData(timeRange, selectedModel);

  const { downloadCSV } = useCSVExport();

  const handleExportApiCalls = () => {
    if (data.recentCalls && data.recentCalls.length > 0) {
      const headers = ['timestamp', 'provider', 'model', 'endpoint', 'method', 'baseUrl', 'tokens', 'cost', 'responseTime'];
      downloadCSV(data.recentCalls, headers, 'api_calls_export.csv');
    } else {
      console.log('No data to export');
      // You might want to show a toast or alert here
    }
  };
  
  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-100">Error</h3>
        <p className="mt-1 text-sm text-gray-400">{error.message || "An unknown error occurred"}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-100 mr-4">Dashboard</h1>
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
              </SelectContent>
            </Select>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4o</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude-3.5-Sonnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SummaryCards data={data.summary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CostTrendChart data={data.costTrend} />
          <PerformanceChart data={data.performance} />
        </div>

        <CostBreakdownChart data={data.costBreakdown} />

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Recent API Calls</h2>
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
            <div className="text-center py-8 bg-gray-800 rounded-lg">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-100">No API Calls</h3>
              <p className="mt-1 text-sm text-gray-400">There are no recent API calls to display.</p>
            </div>
          )}
        </div>
      </div>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;