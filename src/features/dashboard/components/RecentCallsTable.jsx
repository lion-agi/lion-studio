import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import useSettingsStore from '@/store/settingsSlice';
import { formatNumber } from '@/features/dashboard/utils';

const RecentCallsTable = ({ data }) => {
  const tableFields = useSettingsStore((state) => state.tableFields);

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {Object.entries(tableFields).map(([field, isVisible]) => 
              isVisible && <TableHead key={field} className="whitespace-nowrap">{field}</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((call) => (
            <TableRow key={call.id}>
              {Object.entries(tableFields).map(([field, isVisible]) => 
                isVisible && (
                  <TableCell key={field} className="whitespace-nowrap">
                    {field === 'created_at' ? new Date(call[field]).toLocaleString() :
                     field === 'tokens' ? formatNumber(Math.round(call[field])) :
                     field === 'cost' ? (typeof call[field] === 'number' ? call[field].toFixed(5) : 'N/A') :
                     field === 'response_time' ? `${call[field]} ms` :
                     call[field]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentCallsTable;