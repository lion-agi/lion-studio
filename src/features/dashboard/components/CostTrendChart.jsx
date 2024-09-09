import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const formatValue = (value, metric) => {
  switch (metric) {
    case 'totalCost':
    case 'cumulativeCost':
      return `$${value.toFixed(2)}`;
    case 'totalCalls':
    case 'cumulativeCalls':
      return value.toLocaleString();
    case 'avgResponseTime':
      return `${value.toFixed(2)} ms`;
    default:
      return value;
  }
};

const CostTrendChart = ({ data, selectedMetric }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cost Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p>No data available</p>
        </CardContent>
      </Card>
    );
  }

  const metricConfig = {
    totalCost: { key: 'cumulativeCost', label: 'Total Cost', color: '#8884d8' },
    totalCalls: { key: 'cumulativeCalls', label: 'Total Calls', color: '#82ca9d' },
    avgResponseTime: { key: 'avgResponseTime', label: 'Avg Response Time', color: '#ffc658' },
  };

  const config = metricConfig[selectedMetric] || metricConfig.totalCost;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{config.label} Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="created_at" 
              tickFormatter={(timestamp) => format(new Date(timestamp), 'MM/dd')}
            />
            <YAxis 
              tickFormatter={(value) => formatValue(value, selectedMetric)}
            />
            <Tooltip 
              formatter={(value) => formatValue(value, selectedMetric)}
              labelFormatter={(label) => format(new Date(label), 'MM/dd/yyyy HH:mm:ss')}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={config.key} 
              stroke={config.color} 
              name={config.label}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostTrendChart;