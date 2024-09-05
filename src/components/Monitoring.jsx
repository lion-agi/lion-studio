import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Monitoring = () => {
  const billingData = {
    usage: { value: 68.1, change: '+0.2%' },
    workspace: { value: 21.7, change: '+2.9%' },
    costs: { value: 293.5, change: '-1.4%' },
    rowsRead: 48.1,
    rowsWritten: 78.3,
    totalUsers: 28,
    storage: 5.2,
    uptime: 98.3,
  };

  const overviewData = [
    { name: 'Rows read', value: 643015, change: '+4.4%', prevValue: 615752 },
    { name: 'Rows written', value: 83197, change: '-3.9%', prevValue: 86580 },
    { name: 'Queries', value: 14447, change: '-0.9%', prevValue: 14573 },
    { name: 'Payments completed', value: 2850.00, change: '-9.6%', prevValue: 3153.00 },
    { name: 'Sign ups', value: 2098, change: '+7.2%', prevValue: 1957 },
    { name: 'Logins', value: 43243, change: '-9.0%', prevValue: 47538 },
  ];

  const chartData = [
    { date: '16/04', value: 100 },
    { date: '17/04', value: 120 },
    { date: '18/04', value: 110 },
    { date: '19/04', value: 130 },
    { date: '20/04', value: 140 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Current billing cycle</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Usage <span className="text-green-500">{billingData.usage.change}</span></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingData.usage.value}%</div>
            <p className="text-xs text-muted-foreground">of allowed capacity</p>
            <Progress value={billingData.usage.value} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Workspace <span className="text-green-500">{billingData.workspace.change}</span></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingData.workspace.value}%</div>
            <p className="text-xs text-muted-foreground">weekly active users</p>
            <Progress value={billingData.workspace.value} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Costs <span className="text-red-500">{billingData.costs.change}</span></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingData.costs.value}</div>
            <p className="text-xs text-muted-foreground">current billing cycle</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rows read</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{billingData.rowsRead}/100M</div>
            <Progress value={billingData.rowsRead} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Rows written</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{billingData.rowsWritten}/100M</div>
            <Progress value={billingData.rowsWritten} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{billingData.totalUsers}/40</div>
            <Progress value={(billingData.totalUsers / 40) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{billingData.storage}/20GB</div>
            <Progress value={(billingData.storage / 20) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-bold mb-4">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {overviewData.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">{item.name} <span className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{item.change}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">from {item.prevValue.toLocaleString()}</p>
              <div className="h-[100px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Monitoring;