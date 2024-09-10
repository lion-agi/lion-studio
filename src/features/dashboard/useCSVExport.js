import { useCallback } from 'react';

const useCSVExport = () => {
  const convertToCSV = useCallback((data, headers) => {
    if (!data || !data.length) return '';

    const csvRows = [];

    // Add headers
    if (headers) {
      csvRows.push(headers.join(','));
    } else {
      csvRows.push(Object.keys(data[0]).join(','));
    }

    // Add data
    for (const row of data) {
      const values = headers ? headers.map(header => row[header]) : Object.values(row);
      const escapedValues = values.map(value => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') {
          // Escape quotes and wrap in quotes if it contains comma or newline
          if (value.includes('"') || value.includes(',') || value.includes('\n')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }
        return String(value);
      });
      csvRows.push(escapedValues.join(','));
    }

    return csvRows.join('\n');
  }, []);

  const downloadCSV = useCallback((data, headers, filename = 'export.csv') => {
    const csv = convertToCSV(data, headers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [convertToCSV]);

  return { convertToCSV, downloadCSV };
};

export default useCSVExport;
