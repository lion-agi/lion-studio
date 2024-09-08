import { useQuery } from '@tanstack/react-query';
import { useApiCallsByDateRange, useApiCallStats } from '../../integrations/supabase/hooks/apiCalls';

export const useApiData = (timeRange, selectedModel) => {
  const endTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const startTimestamp = endTimestamp - getTimeRangeInSeconds(timeRange);

  const apiCallsQuery = useApiCallsByDateRange(startTimestamp, endTimestamp, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  const apiStatsQuery = useApiCallStats(startTimestamp, endTimestamp, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  const isLoading = apiCallsQuery.isLoading || apiStatsQuery.isLoading;
  const error = apiCallsQuery.error || apiStatsQuery.error;

  const processedDataQuery = useQuery({
    queryKey: ['processedApiData', apiCallsQuery.data, apiStatsQuery.data, selectedModel, timeRange],
    queryFn: () => processApiData(apiCallsQuery.data, apiStatsQuery.data, selectedModel, timeRange),
    enabled: !!apiCallsQuery.data && !!apiStatsQuery.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
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

const processApiData = (apiCalls, apiStats, selectedModel, timeRange) => {
  // Filter apiCalls based on selectedModel if needed
  const filteredCalls = selectedModel === 'all' 
    ? apiCalls 
    : apiCalls.filter(call => call.model === selectedModel);

  // Process the data as needed for your dashboard components
  // This is just an example, adjust according to your specific needs
  return {
    summary: apiStats.stats,
    costTrend: generateCostTrend(filteredCalls, timeRange),
    costBreakdown: generateCostBreakdown(filteredCalls),
    performance: generatePerformanceData(filteredCalls),
    recentCalls: filteredCalls.slice(0, 100), // Get the 100 most recent calls
  };
};

const generateCostTrend = (apiCalls, timeRange) => {
  // Implement cost trend generation logic
  // Group calls by day and calculate daily costs
};

const generateCostBreakdown = (apiCalls) => {
  // Implement cost breakdown logic
  // Group costs by model or other relevant categories
};

const generatePerformanceData = (apiCalls) => {
  // Implement performance data generation logic
  // Calculate average response times, error rates, etc.
};