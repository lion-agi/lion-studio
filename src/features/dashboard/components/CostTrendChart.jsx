import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatCurrency } from '@/features/dashboard/utils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg">
        <p className="text-gray-300 text-sm">{`Date: ${label}`}</p>
        <p className="text-purple-400 text-sm">{`Cost: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const CostTrendChart = ({ data }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-gray-100">Cost Trend</CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              tickFormatter={(value) => {
                const formatted = formatCurrency(value);
                return formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted;
              }}
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#9CA3AF' }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="cost" 
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

export default CostTrendChart;