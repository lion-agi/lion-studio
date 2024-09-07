import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CostTrendChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Cost Trend</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px] bg-gray-800 hover:bg-gray-700 transition-colors">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cost" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default CostTrendChart;