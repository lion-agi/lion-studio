import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { formatNumber, formatCurrency } from '@/features/dashboard/utils';

const RecentCallsTable = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, rowsPerPage]);

  // Filter calls based on the search input
  const filteredCalls = data.filter(call =>
    Object.values(call).some(value =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCalls.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCalls = filteredCalls.slice(startIndex, endIndex);

  return (
    <div className="space-y-4 my-8">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filter calls..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rows per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
            <SelectItem value="100">100 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredCalls.length)} of {filteredCalls.length} entries
        </div>
      </div>

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
            {displayedCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell className="whitespace-nowrap">
                  {new Date(call.created_at).toLocaleString(undefined, {
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
                <TableCell className="whitespace-nowrap">{call.base_url}</TableCell>
                <TableCell className="text-right">{formatNumber(Math.round(call.tokens))}</TableCell>
                <TableCell className="text-right">{typeof call.cost === 'number' ? formatCurrency(call.cost) : 'N/A'}</TableCell>
                <TableCell className="text-right">{call.response_time} ms</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end items-center space-x-2">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RecentCallsTable;