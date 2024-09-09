import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import useSettingsStore from '@/store/settingsSlice';
import { formatDate, formatNumber, formatCurrency } from '@/features/dashboard/utils';

const RecentCallsTable = ({ data }) => {
  const tableFields = useSettingsStore((state) => state.tableFields);

  const formatField = (field, value) => {
    switch (field) {
      case 'timestamp':
        return formatDate(value);
      case 'tokens':
        return formatNumber(value);
      case 'cost':
        return formatCurrency(value);
      case 'responseTime':
        return `${value} ms`;
      default:
        return value;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.entries(tableFields).map(([field, isVisible]) => 
            isVisible && <TableHead key={field}>{capitalizeFirstLetter(field)}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((call) => (
          <TableRow key={call.id}>
            {Object.entries(tableFields).map(([field, isVisible]) => 
              isVisible && (
                <TableCell key={field}>
                  {formatField(field, call[field])}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentCallsTable;