import { useQuery } from '@tanstack/react-query';
import { useApiCallsByDateRange, useApiCallStats } from '../../integrations/supabase/hooks/apiCalls';
import { fetchApiData } from './api';

export const useApiData = (timeRange, selectedModel) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - getTimeRangeInMilliseconds(timeRange));

  const apiCallsQuery = useQuery({
    queryKey: ['apiCalls', startDate.toISOString(), endDate.toISOString()],
    queryFn: () => useApiCallsByDateRange(startDate.toISOString(), endDate.toISOString()),
  });

  const apiStatsQuery = useQuery({
    queryKey: ['apiStats'],
    queryFn: useApiCallStats,
  });

  const isLoading = apiCallsQuery.isLoading || apiStatsQuery.isLoading;
  const error = apiCallsQuery.error || apiStatsQuery.error;

  const processedDataQuery = useQuery({
    queryKey: ['processedApiData', apiCallsQuery.data, apiStatsQuery.data, selectedModel],
    queryFn: () => fetchApiData(apiCallsQuery.data, apiStatsQuery.data),
    enabled: !!apiCallsQuery.data && !!apiStatsQuery.data,
  });

  return {
    data: processedDataQuery.data,
    isLoading: isLoading || processedDataQuery.isLoading,
    error: error || processedDataQuery.error,
  };
};

const getTimeRangeInMilliseconds = (timeRange) => {
  switch (timeRange) {
    case '24h': return 24 * 60 * 60 * 1000;
    case '7d': return 7 * 24 * 60 * 60 * 1000;
    case '30d': return 30 * 24 * 60 * 60 * 1000;
    case '90d': return 90 * 24 * 60 * 60 * 1000;
    default: return 7 * 24 * 60 * 60 * 1000; // Default to 7 days
  }
};