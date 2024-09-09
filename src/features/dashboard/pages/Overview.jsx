import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { TrendingUp, PieChart, Activity, AlertTriangle } from 'lucide-react';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import SummaryCards from '../components/SummaryCards';
import EmptyState from '../../library/components/EmptyState';

const OverviewTab = ({ data }) => (
  <Tabs defaultValue="summary" className="mt-8">
    <TabsList className="bg-gray-800 p-1 rounded-lg mb-6">
      <TabsTrigger value="summary" className="data-[state=active]:bg-purple-700 text-gray-200">Summary</TabsTrigger>
      <TabsTrigger value="costTrend" className="data-[state=active]:bg-purple-700 text-gray-200">Cost Trend</TabsTrigger>
      <TabsTrigger value="costBreakdown" className="data-[state=active]:bg-purple-700 text-gray-200">Cost Breakdown</TabsTrigger>
    </TabsList>
    
    <TabsContent value="summary">
      {data && data.summary ? (
        <SummaryCards data={data.summary} />
      ) : (
        <EmptyState message="No summary data available." icon={Activity} />
      )}
    </TabsContent>
    
    <TabsContent value="costTrend">
      {data && data.costTrend && data.costTrend.length > 0 ? (
        <CostTrendChart data={data.costTrend} />
      ) : (
        <EmptyState message="No cost trend data available." icon={TrendingUp} />
      )}
    </TabsContent>
    
    <TabsContent value="costBreakdown">
      {data && data.costBreakdown && data.costBreakdown.length > 0 ? (
        <CostBreakdownChart data={data.costBreakdown} />
      ) : (
        <EmptyState message="No cost breakdown data available." icon={PieChart} />
      )}
    </TabsContent>
  </Tabs>
);

export default OverviewTab;