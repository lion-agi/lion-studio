import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Progress } from "@/common/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Monitoring = () => {
  const apiUsageData = {
    totalRequests: { value: 1245678, change: '+5.2%' },
    averageResponseTime: { value: 287, change: '-2.1%' },
    errorRate: { value: 1.8, change: '+0.3%' },
    uniqueUsers: { value: 52890, change: '+7.9%' },
  };

  const quotaData = {
    requestsUsed: 68.1,
    dataTransfer: 47.5,
    computeTime: 32.8,
    storageUsed: 78.3,
  };

  const endpointUsage = [
    { name: '/users', requests: 324567, avgResponseTime: 145 },
    { name: '/products', requests: 256789, avgResponseTime: 210 },
    { name: '/orders', requests: 198765, avgResponseTime: 320 },
    { name: '/analytics', requests: 87654, avgResponseTime: 540 },
    { name: '/auth', requests: 378901, avgResponseTime: 95 },
  ];

  const timeSeriesData = [
    { date: '04/16', requests: 98760, errors: 1240 },
    { date: '04/17', requests: 102345, errors: 1560 },
    { date: '04/18', requests: 97890, errors: 1100 },
    { date: '04/19', requests: 110567, errors: 1780 },
    { date: '04/20', requests: 115678, errors: 1890 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(apiUsageData).map(([key, data]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                <span className={data.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                  {' '}{data.change}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {key === 'averageResponseTime' ? 'ms' : key === 'errorRate' ? '%' : 'total'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Quota Usage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(quotaData).map(([key, value]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{value}%</div>
              <Progress value={value} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Endpoint Usage</h2>
      <Card className="mb-8">
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={endpointUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="requests" fill="#8884d8" name="Requests" />
                <Bar yAxisId="right" dataKey="avgResponseTime" fill="#82ca9d" name="Avg Response Time (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Requests Over Time</h2>
      <Card>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#8884d8" name="Requests" />
                <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#82ca9d" name="Errors" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Monitoring;