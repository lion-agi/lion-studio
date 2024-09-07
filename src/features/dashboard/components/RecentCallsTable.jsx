import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { formatCurrency, formatNumber } from '@/features/dashboard/utils';

// Utility function to safely format cost
const safeCurrency = (value) => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? 'N/A' : formatCurrency(num);
};

const RecentCallsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-800">
            <TableHead className="text-xs font-medium text-gray-300 py-2">Timestamp</TableHead>
            <TableHead className="text-xs font-medium text-gray-300 py-2">Endpoint</TableHead>
            <TableHead className="text-xs font-medium text-gray-300 py-2 text-right">Tokens</TableHead>
            <TableHead className="text-xs font-medium text-gray-300 py-2 text-right">Cost</TableHead>
            <TableHead className="text-xs font-medium text-gray-300 py-2 text-right">Response Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((call) => (
            <TableRow key={call.id} className="border-b border-gray-700">
              <TableCell className="text-xs py-2 text-gray-300">{new Date(call.timestamp).toLocaleString()}</TableCell>
              <TableCell className="text-xs py-2 text-gray-300">{call.endpoint}</TableCell>
              <TableCell className="text-xs py-2 text-gray-300 text-right">{formatNumber(call.tokens)}</TableCell>
              <TableCell className="text-xs py-2 text-gray-300 text-right">{safeCurrency(call.cost)}</TableCell>
              <TableCell className="text-xs py-2 text-gray-300 text-right">{call.responseTime} ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentCallsTable;