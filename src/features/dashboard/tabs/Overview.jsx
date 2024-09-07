import React from 'react';
import CostTrendChart from '../charts/CostTrendChart';
import CostBreakdownChart from '../charts/CostBreakdownChart';

const OverviewTab = ({ data }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <CostTrendChart data={data.costTrend} />
    <CostBreakdownChart data={data.costBreakdown} />
  </div>
);

export default OverviewTab;