import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
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
  <div className="absolute top-4 right-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-4 rounded shadow-lg max-w-[200px]">
    <h3 className="text-lg font-semibold mb-2 text-gray-200">{data.model}</h3>
    <table className="w-full text-sm">
      <tbody>
        <tr>
          <td className="text-gray-400">Total Cost:</td>
          <td className="text-right text-gray-200">{formatCurrency(data.cost)}</td>
        </tr>
        <tr>
          <td className="text-gray-400">Usage:</td>
          <td className="text-right text-gray-200">{data.percentage.toFixed(2)}%</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const LegendItem = ({ color, model }) => (
  <div className="flex items-center mb-1">
    <div className="w-3 h-3 mr-2" style={{ backgroundColor: color }}></div>
    <span className="text-xs text-gray-300">{model}</span>
  </div>
);

const CostBreakdownChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const onPieEnter = useCallback((_, index) => {
    setHoveredIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Check if data is undefined or not an array
  if (!data || !Array.isArray(data) || data.length === 0) {
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

  const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
  const processedData = data.map(item => ({
    ...item,
    percentage: (item.cost / totalCost) * 100
  }));

  const modelWithHighestUsage = processedData.reduce((prev, current) => 
    (current.percentage > prev.percentage) ? current : prev
  );

  const displayedInfo = hoveredIndex !== null ? processedData[hoveredIndex] : modelWithHighestUsage;

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Cost Breakdown by Model</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative overflow-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="cost"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <InfoTable data={displayedInfo} />
        <div className="absolute bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-4 rounded shadow-lg">
          {processedData.map((item, index) => (
            <LegendItem key={item.model} color={COLORS[index % COLORS.length]} model={item.model} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownChart;