import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatCurrency } from '@/features/dashboard/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Info } from 'lucide-react';

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

const CostTrendChart = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-gray-100">Cost Trend</CardTitle>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>Cost Trend Information</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>This chart displays the trend of costs over time. It helps you visualize:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Daily or monthly spending patterns</li>
                <li>Sudden spikes or drops in costs</li>
                <li>Overall cost trajectory</li>
              </ul>
              <p className="mt-4">Use this information to:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Identify cost anomalies</li>
                <li>Plan budget allocations</li>
                <li>Make informed decisions on resource usage</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              tickFormatter={(value) => formatCurrency(value)}
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
      </CardContent>
    </Card>
  );
};

export default CostTrendChart;