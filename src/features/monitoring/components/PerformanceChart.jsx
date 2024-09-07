import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PerformanceChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Performance Metrics</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#8884d8" name="Avg Response Time (ms)" />
          <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#82ca9d" name="Error Rate (%)" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default PerformanceChart;