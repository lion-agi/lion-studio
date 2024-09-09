import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { formatDate, formatNumber, formatCurrency } from '@/common/utils/formatters';

const RecentCallsTable = ({ calls }) => {
  // Add a null check and provide a default empty array
  const safeCalls = calls || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Tokens</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Response Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {safeCalls.map((call, index) => (
          <TableRow key={index}>
            <TableCell>{formatDate(call.created_at)}</TableCell>
            <TableCell>{call.model}</TableCell>
            <TableCell>{formatNumber(call.tokens)}</TableCell>
            <TableCell>{formatCurrency(call.cost)}</TableCell>
            <TableCell>{call.response_time} ms</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentCallsTable;