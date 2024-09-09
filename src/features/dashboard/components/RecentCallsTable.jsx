import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { useSettingsStore } from '@/store/settingsSlice';
import { formatDate, formatNumber, formatCurrency, formatResponseTime } from '@/common/utils/formatters';

const RecentCallsTable = ({ calls }) => {
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
        return formatResponseTime(value);
      default:
        return value;
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Add a null check and provide a default empty array
  const safeCalls = calls || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.entries(tableFields).map(([field, isVisible]) => 
            isVisible && <TableHead key={field}>{capitalizeFirstLetter(field.replace('_', ' '))}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {safeCalls.map((call, index) => (
          <TableRow key={index}>
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