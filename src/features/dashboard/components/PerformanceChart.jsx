import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg">
        <p className="text-gray-300 text-sm">{`Date: ${label}`}</p>
        <p className="text-purple-400 text-sm">{`Avg Response Time: ${payload[0].value.toFixed(2)} ms`}</p>
        <p className="text-green-400 text-sm">{`Error Rate: ${(payload[1].value * 100).toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const PerformanceChart = ({ data }) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="responseTime" 
              stroke="#8B5CF6" 
              name="Avg Response Time (ms)" 
              dot={false}
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="errorRate" 
              stroke="#10B981" 
              name="Error Rate (%)" 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;