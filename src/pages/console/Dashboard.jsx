import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Progress } from "@/common/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Users, Database, Zap, Clock, HardDrive } from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  // Simulated data - in a real application, this would be fetched from an API
  const overviewData = {
    totalRequests: 1245678,
    activeUsers: 52890,
    dataProcessed: 1.8,
    averageResponseTime: 287
  };

  const quotaData = {
    apiCalls: 68,
    dataTransfer: 47,
    computeTime: 33,
    storage: 78
  };

  const timeSeriesData = [
    { date: '04/15', requests: 95000, errors: 1150 },
    { date: '04/16', requests: 98760, errors: 1240 },
    { date: '04/17', requests: 102345, errors: 1560 },
    { date: '04/18', requests: 97890, errors: 1100 },
    { date: '04/19', requests: 110567, errors: 1780 },
    { date: '04/20', requests: 115678, errors: 1890 },
    { date: '04/21', requests: 108900, errors: 1450 },
  ];

  const endpointData = [
    { name: '/users', requests: 324567, avgResponseTime: 145 },
    { name: '/products', requests: 256789, avgResponseTime: 210 },
    { name: '/orders', requests: 198765, avgResponseTime: 320 },
    { name: '/analytics', requests: 87654, avgResponseTime: 540 },
    { name: '/auth', requests: 378901, avgResponseTime: 95 },
  ];

  const pieColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  useEffect(() => {
    // Fetch data based on selected time range
    // This is where you'd make API calls in a real application
  }, [timeRange]);

  const MetricCard = ({ title, value, icon: Icon }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Requests" value={overviewData.totalRequests} icon={Activity} />
        <MetricCard title="Active Users" value={overviewData.activeUsers} icon={Users} />
        <MetricCard title="Data Processed (TB)" value={overviewData.dataProcessed} icon={Database} />
        <MetricCard title="Avg Response Time (ms)" value={overviewData.averageResponseTime} icon={Zap} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="quota">Quota Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requests Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Usage</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={endpointData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quota" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Quota Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(quotaData).map(([key, value]) => ({ name: key, value }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(quotaData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;