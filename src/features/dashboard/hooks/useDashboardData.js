import { useState, useEffect } from 'react';
import { useApiCallStats } from '@/integrations/supabase/hooks/apiCalls';

export const useDashboardData = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });

  const { stats, isLoading, error } = useApiCallStats(dateRange.from, dateRange.to);

  const handleDateRangeChange = (newDateRange) => {
    if (newDateRange.to > new Date()) {
      newDateRange.to = new Date();
    }
    setDateRange(newDateRange);
  };

  return {
    dateRange,
    handleDateRangeChange,
    stats,
    isLoading,
    error
  };
};