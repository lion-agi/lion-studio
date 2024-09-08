import React, { useState, useCallback, useMemo } from 'react';
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
        <p className="text-gray-300 text-sm">{`Cost: ${formatCurrency(data.cost)}`}</p>
        <p className="text-gray-300 text-sm">{`Usage: ${data.percentage.toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

const CostBreakdownChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const processedData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
    return data.map(item => ({
      ...item,
      percentage: (item.cost / totalCost) * 100
    })).sort((a, b) => b.cost - a.cost);
  }, [data]);

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-2 mt-4">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center">
            <span className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></span>
            <span className="text-xs text-gray-300">{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  if (processedData.length === 0) {
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

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Cost Breakdown by Model</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] relative overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              fill="#8884d8"
              paddingAngle={2}
              dataKey="cost"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke={activeIndex === index ? '#fff' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostBreakdownChart;