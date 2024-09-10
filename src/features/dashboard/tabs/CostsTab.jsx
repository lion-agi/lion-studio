import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';

const CostsTab = ({ data }) => (
  <div className="space-y-6">
    <CostTrendChart data={data.costTrend} />
    <CostBreakdownChart data={data.costBreakdown} />
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-100">Detailed Cost Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add detailed cost analysis content here */}
      </CardContent>
    </Card>
  </div>
);

export default CostsTab;