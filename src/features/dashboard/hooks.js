import { useQuery } from '@tanstack/react-query';
import { useApiCallsByDateRange, useApiCallStats } from '../../integrations/supabase/hooks/apiCalls';
import { fetchApiData } from './api';

export const useApiData = (timeRange, selectedModel) => {
  const endTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const startTimestamp = endTimestamp - getTimeRangeInSeconds(timeRange);

  const apiCallsQuery = useApiCallsByDateRange(startTimestamp, endTimestamp);

  const apiStatsQuery = useApiCallStats();

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

const getTimeRangeInSeconds = (timeRange) => {
  switch (timeRange) {
    case '24h': return 24 * 60 * 60;
    case '7d': return 7 * 24 * 60 * 60;
    case '30d': return 30 * 24 * 60 * 60;
    case '90d': return 90 * 24 * 60 * 60;
    default: return 7 * 24 * 60 * 60; // Default to 7 days
  }
};