import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/features/dashboard/utils';

const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#14B8A6', '#6366F1', '#D946EF', '#F97316'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg">
        <p className="text-gray-300 text-sm font-semibold">{data.model}</p>
        <p className="text-gray-300 text-sm">{`Cost: ${formatCurrency(data.value)}`}</p>
        <p className="text-gray-300 text-sm">{`Percentage: ${data.percentage.toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const CostBreakdownChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Cost Breakdown by Model</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] relative overflow-auto flex items-center justify-center">
          <p className="text-gray-400">No cost breakdown data available</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = Object.entries(data).map(([model, cost]) => ({
    model,
    value: cost,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  chartData.forEach(item => {
    item.percentage = (item.value / total) * 100;
  });

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Cost Breakdown by Model</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownChart;