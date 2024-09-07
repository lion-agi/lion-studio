import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { formatNumber } from '@/features/dashboard/utils';

const RecentCallsTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Timestamp</TableHead>
            <TableHead className="whitespace-nowrap">Provider</TableHead>
            <TableHead className="whitespace-nowrap">Model</TableHead>
            <TableHead className="whitespace-nowrap">Endpoint</TableHead>
            <TableHead className="whitespace-nowrap">Method</TableHead>
            <TableHead className="whitespace-nowrap">Base URL</TableHead>
            <TableHead className="whitespace-nowrap text-right">Tokens</TableHead>
            <TableHead className="whitespace-nowrap text-right">Cost</TableHead>
            <TableHead className="whitespace-nowrap text-right">Response Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((call) => (
            <TableRow key={call.id}>
              <TableCell className="whitespace-nowrap">
                {new Date(call.timestamp).toLocaleString(undefined, {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </TableCell>
              <TableCell className="whitespace-nowrap">{call.provider}</TableCell>
              <TableCell className="whitespace-nowrap">{call.model}</TableCell>
              <TableCell className="whitespace-nowrap">{call.endpoint}</TableCell>
              <TableCell className="whitespace-nowrap">{call.method}</TableCell>
              <TableCell className="whitespace-nowrap">{call.baseUrl}</TableCell>
              <TableCell className="text-right">{formatNumber(Math.round(call.tokens))}</TableCell>
              <TableCell className="text-right">{typeof call.cost === 'number' ? call.cost.toFixed(5) : 'N/A'}</TableCell>
              <TableCell className="text-right">{call.responseTime} ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentCallsTable;