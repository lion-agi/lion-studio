import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";

const DashboardCard = ({ title, value, change, icon: Icon }) => (
  <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-gray-100">{value}</div>
      <p className="text-xs text-gray-400">
        {change && `${change} from last period`}
      </p>
    </CardContent>
  </Card>
);

export default DashboardCard;

// Path: src/features/dashboard/components/DashboardCard.jsx