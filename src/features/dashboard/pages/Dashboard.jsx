import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Search, Info } from 'lucide-react';
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { useApiData } from '../hooks/useApiData';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import AgenticFlowWizard from '@/common/components/AgenticFlowWizard';
import WorkflowOperationsPanel from '@/features/workflow/components/WorkflowOperationsPanel';
import NodeCreationCard from '@/features/workflow/components/NodeCreationCard';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('totalCost');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardType, setWizardType] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, error } = useApiData(timeRange);

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
    <div className="container mx-auto p-6 space-y-6">
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
        <div className="flex space-x-4 items-center">
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <SummaryCards data={data.summary} onMetricClick={handleMetricClick} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CostTrendChart data={data.costTrend} selectedMetric={selectedMetric} />
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={() => openWizard('agentic-flow')}>
              Create Agentic Flow
            </Button>
            <Button className="w-full" onClick={() => navigate('/console/workflow')}>
              Open Workflow Editor
            </Button>
            <Button className="w-full" onClick={() => openWizard('integration')}>
              Add New Integration
            </Button>
            <Button className="w-full" onClick={() => navigate('/console/library')}>
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

      <NodeCreationCard
        onAddNode={() => {}}
        onSave={() => {}}
        onLoad={() => {}}
        backgroundColor="bg-gray-800"
      />
    </div>
  );
};

export default Dashboard;