import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/features/dashboard/utils';

const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-lg">
        <p className="text-gray-300 text-sm">{`${data.model}: ${formatCurrency(data.cost)}`}</p>
      </div>
    );
  }
  return null;
};

const InfoTable = ({ data }) => (
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/80 border border-gray-700 p-4 rounded shadow-lg">
    <h3 className="text-lg font-semibold mb-2 text-gray-200">{data.model}</h3>
    <table className="w-full text-sm">
      <tbody>
        <tr>
          <td className="text-gray-400">Total Cost:</td>
          <td className="text-right text-gray-200">{formatCurrency(data.cost)}</td>
        </tr>
        <tr>
          <td className="text-gray-400">Number of Calls:</td>
          <td className="text-right text-gray-200">{data.calls}</td>
        </tr>
        <tr>
          <td className="text-gray-400">Last Call:</td>
          <td className="text-right text-gray-200">{data.lastCall}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const CostBreakdownChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Cost Breakdown by Model</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="cost"
              nameKey="model"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {hoveredIndex !== null && <InfoTable data={data[hoveredIndex]} />}
      </CardContent>
    </Card>
  );
};

export default CostBreakdownChart;