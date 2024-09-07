import React from 'react';
import { DollarSign, Activity, Clock, AlertTriangle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { formatCurrency, formatNumber, formatPercentage } from '../utils';

const SummaryCards = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <DashboardCard
      title="Total Cost"
      value={formatCurrency(data.totalCost)}
      change={formatPercentage(data.costChange)}
      icon={DollarSign}
    />
    <DashboardCard
      title="Total API Calls"
      value={formatNumber(data.totalCalls)}
      change={formatPercentage(data.callsChange)}
      icon={Activity}
    />
    <DashboardCard
      title="Avg Response Time"
      value={`${data.avgResponseTime} ms`}
      change={formatPercentage(data.responseTimeChange)}
      icon={Clock}
    />
    <DashboardCard
      title="Error Rate"
      value={formatPercentage(data.errorRate)}
      change={formatPercentage(data.errorRateChange)}
      icon={AlertTriangle}
    />
  </div>
);

export default SummaryCards;