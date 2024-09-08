import { useQuery } from '@tanstack/react-query';
import { useApiCallsByDateRange, useApiCallStats } from '../../integrations/supabase/hooks/apiCalls';
import { formatApiCallData } from './utils/dataFormatters';

export const useApiData = (timeRange, selectedModel) => {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - getTimeRangeInMilliseconds(timeRange));

  const { data: apiCalls, isLoading: apiCallsLoading, error: apiCallsError } = useApiCallsByDateRange(startDate.toISOString(), endDate.toISOString());
  const { data: apiStats, isLoading: apiStatsLoading, error: apiStatsError } = useApiCallStats();

  const isLoading = apiCallsLoading || apiStatsLoading;
  const error = apiCallsError || apiStatsError;

  const data = formatApiCallData(apiCalls, apiStats, selectedModel);

  return {
    data,
    isLoading,
    error,
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