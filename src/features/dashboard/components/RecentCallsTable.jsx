import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { formatNumber } from '@/features/dashboard/utils';

const RecentCallsTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({});

  const columns = [
    { key: 'timestamp', label: 'Timestamp' },
    { key: 'provider', label: 'Provider' },
    { key: 'model', label: 'Model' },
    { key: 'endpoint', label: 'Endpoint' },
    { key: 'method', label: 'Method' },
    { key: 'baseUrl', label: 'Base URL' },
    { key: 'tokens', label: 'Tokens' },
    { key: 'cost', label: 'Cost' },
    { key: 'responseTime', label: 'Response Time' },
  ];

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(call => {
      return Object.entries(filters).every(([key, value]) => {
        return call[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [sortedData, filters]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={column.key} className="whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-transparent"
                    onClick={() => requestSort(column.key)}
                  >
                    {column.label}
                    {sortConfig.key === column.key && (
                      sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <Input
                    placeholder={`Filter ${column.label}`}
                    className="max-w-sm"
                    onChange={(e) => handleFilterChange(column.key, e.target.value)}
                  />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((call) => (
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