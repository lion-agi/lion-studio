import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Search, Info, MessageSquare, FileText, FolderPlus, PlusCircle } from 'lucide-react';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { useApiData } from '../hooks/useApiData';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import AgenticFlowWizard from '@/common/components/AgenticFlowWizard';
import WorkflowOperationsPanel from '@/features/workflow/components/WorkflowOperationsPanel';
import { DateRangePicker } from "@/common/components/ui/date-range-picker";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('totalCost');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardType, setWizardType] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const navigate = useNavigate();

  const { data, isLoading, error } = useApiData(timeRange, dateRange);

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  const openWizard = (type) => {
    setWizardType(type);
    setIsWizardOpen(true);
  };

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error loading dashboard data: {error.message}</div>;

  return (
    <div className="container mx-auto p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
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
        <div className="flex items-center space-x-4">
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
          />
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search workflows..."
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      <SummaryCards data={data.summary} onMetricClick={handleMetricClick} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CostTrendChart data={data.costTrend} selectedMetric={selectedMetric} />
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
              onClick={() => openWizard('agentic-flow')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Agentic Flow
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
              onClick={() => navigate('/console/workflow')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Workflow Editor
            </Button>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
              onClick={() => openWizard('integration')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Add New Integration
            </Button>
            <Button 
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white flex items-center justify-center"
              onClick={() => navigate('/console/library')}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Manage Knowledge Base
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <RecentCallsTable calls={data.recentCalls} />

      <AgenticFlowWizard
        isOpen={isWizardOpen && wizardType === 'agentic-flow'}
        onClose={() => setIsWizardOpen(false)}
        onCreateFlow={(flowConfig) => {
          console.log('Creating new flow:', flowConfig);
          setIsWizardOpen(false);
        }}
      />

      {isWizardOpen && wizardType === 'integration' && (
        <WorkflowOperationsPanel
          onExportJSON={() => {}}
          onSaveLoad={() => {}}
          onCreateAgenticFlow={() => {}}
          onClose={() => setIsWizardOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;