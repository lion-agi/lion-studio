import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { formatDate, formatNumber, formatCurrency } from '@/common/utils/formatters';

const RecentCallsTable = ({ calls }) => {
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, rowsPerPage]);

  // Safely access object properties
  const safeAccess = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) ?? '';
  };

  // Filter calls based on the search input
  const filteredCalls = calls?.filter(call => 
    Object.values(call).some(value => 
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  ) ?? [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredCalls.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedCalls = filteredCalls.slice(startIndex, endIndex);

  return (
    <div className="space-y-4 my-8"> {/* Added vertical margin */}
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
          {displayedCalls.map((call, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(safeAccess(call, 'created_at'))}</TableCell>
              <TableCell>{safeAccess(call, 'model')}</TableCell>
              <TableCell>{formatNumber(safeAccess(call, 'tokens'))}</TableCell>
              <TableCell>{formatCurrency(safeAccess(call, 'cost'))}</TableCell>
              <TableCell>{safeAccess(call, 'response_time')} ms</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <div>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredCalls.length)} of {filteredCalls.length} entries
        </div>
        <div className="space-x-2">
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
    </div>
  );
};

export default RecentCallsTable;