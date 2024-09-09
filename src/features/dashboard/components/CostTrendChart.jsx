import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency, formatNumber, formatPercentage } from '@/features/dashboard/utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg">
        <p className="text-gray-300 text-sm">{`Date: ${label}`}</p>
        <p className="text-purple-400 text-sm">{`${payload[0].name}: ${formatValue(payload[0].value, payload[0].name)}`}</p>
      </div>
    );
  }
  return null;
};

const formatValue = (value, metric) => {
  switch (metric) {
    case 'totalCost':
      return formatCurrency(value);
    case 'totalCalls':
      return formatNumber(value);
    case 'avgResponseTime':
      return `${formatNumber(value)} ms`;
    case 'avgCost':
      return formatCurrency(value);
    default:
      return value;
  }
};

const CostTrendChart = ({ data, selectedMetric }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Cost Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex justify-center items-center h-[300px]">
          <p className="text-gray-400">No cost trend data available</p>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate cumulative sum for totalCalls
  if (selectedMetric === 'totalCalls') {
    let cumulativeSum = 0;
    sortedData.forEach(item => {
      cumulativeSum += item.totalCalls;
      item.totalCalls = cumulativeSum;
    });
  }

  // Calculate moving average for avgResponseTime
  if (selectedMetric === 'avgResponseTime') {
    const windowSize = Math.min(7, sortedData.length); // 7-day moving average or less if not enough data
    for (let i = 0; i < sortedData.length; i++) {
      const window = sortedData.slice(Math.max(0, i - windowSize + 1), i + 1);
      const sum = window.reduce((acc, item) => acc + item.avgResponseTime, 0);
      sortedData[i].avgResponseTime = sum / window.length;
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Trend Chart</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex justify-center">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF" 
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF" 
                tickFormatter={(value) => formatValue(value, selectedMetric)}
                tick={{ fill: '#9CA3AF' }}
                tickLine={{ stroke: '#9CA3AF' }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={selectedMetric}
                name={selectedMetric}
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostTrendChart;