import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { DollarSign, Activity, Clock, AlertTriangle } from 'lucide-react';

// Utility function to safely convert to float and format
const safeNumberFormat = (value, decimals = 2) => {
  const num = parseFloat(value);
  if (isNaN(num)) return 'N/A';
  return num.toFixed(decimals);
};

const SummaryCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const SummaryCards = ({ data }) => (
  <div className="grid grid-cols-2 gap-4">
    <SummaryCard 
      title="Total Cost" 
      value={`${safeNumberFormat(data.totalCost)}`} 
      icon={DollarSign} 
    />
    <SummaryCard 
      title="Total API Calls" 
      value={parseInt(data.totalCalls).toLocaleString()} 
      icon={Activity} 
    />
    <SummaryCard 
      title="Avg Response Time" 
      value={`${safeNumberFormat(data.avgResponseTime)} ms`} 
      icon={Clock} 
    />
    <SummaryCard 
      title="Error Rate" 
      value={`${safeNumberFormat(data.errorRate)}%`} 
      icon={AlertTriangle} 
    />
  </div>
);

export default SummaryCards;