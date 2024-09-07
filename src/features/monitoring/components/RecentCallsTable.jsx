import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { formatCurrency, formatNumber } from '@/features/monitoring/utils';

// Utility function to safely format cost
const safeCurrency = (value) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? 'N/A' : formatCurrency(num);
};

const RecentCallsTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Endpoint</TableHead>
          <TableHead className="text-right">Tokens</TableHead>
          <TableHead className="text-right">Cost</TableHead>
          <TableHead className="text-right">Response Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((call) => (
          <TableRow key={call.id}>
            <TableCell>{call.timestamp}</TableCell>
            <TableCell>{call.endpoint}</TableCell>
            <TableCell className="text-right">{formatNumber(call.tokens)}</TableCell>
            <TableCell className="text-right">{safeCurrency(call.cost)}</TableCell>
            <TableCell className="text-right">{call.responseTime} ms</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentCallsTable;