import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/supabase';

const fetchApiData = async (timeRange, selectedModel) => {
  const now = new Date();
  let startDate;

  switch (timeRange) {
    case '24h':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  let query = supabase
    .from('api_calls')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', now.toISOString())
    .order('created_at', { ascending: false });

  if (selectedModel !== 'all') {
    query = query.eq('model', selectedModel);
  }

  const { data: apiCalls, error } = await query;

  if (error) {
    console.error('Error fetching API calls:', error);
    throw new Error('Failed to fetch API calls');
  }

  // Process the data
  const summary = calculateSummary(apiCalls);
  const costTrend = calculateCostTrend(apiCalls);
  const costBreakdown = calculateCostBreakdown(apiCalls);
  const performance = calculatePerformance(apiCalls);

  return {
    summary,
    costTrend,
    costBreakdown,
    performance,
    recentCalls: apiCalls.slice(0, 100), // Get the 100 most recent calls
  };
};

const calculateSummary = (apiCalls) => {
  const totalCost = apiCalls.reduce((sum, call) => sum + (call.cost || 0), 0);
  const totalCalls = apiCalls.length;
  const avgResponseTime = apiCalls.reduce((sum, call) => sum + (call.response_time || 0), 0) / totalCalls;
  const errorRate = apiCalls.filter(call => call.error).length / totalCalls;

  return {
    totalCost,
    totalCalls,
    avgResponseTime,
    errorRate,
  };
};

const calculateCostTrend = (apiCalls) => {
  const costByDate = apiCalls.reduce((acc, call) => {
    const date = new Date(call.created_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + (call.cost || 0);
    return acc;
  }, {});

  return Object.entries(costByDate).map(([date, cost]) => ({ date, cost }));
};

const calculateCostBreakdown = (apiCalls) => {
  const costByModel = apiCalls.reduce((acc, call) => {
    acc[call.model] = (acc[call.model] || 0) + (call.cost || 0);
    return acc;
  }, {});

  return Object.entries(costByModel).map(([model, cost]) => ({ model, cost }));
};

const calculatePerformance = (apiCalls) => {
  const perfByDate = apiCalls.reduce((acc, call) => {
    const date = new Date(call.created_at).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = { totalResponseTime: 0, errorCount: 0, totalCalls: 0 };
    }
    acc[date].totalResponseTime += call.response_time || 0;
    acc[date].errorCount += call.error ? 1 : 0;
    acc[date].totalCalls += 1;
    return acc;
  }, {});

  return Object.entries(perfByDate).map(([date, data]) => ({
    date,
    responseTime: data.totalResponseTime / data.totalCalls,
    errorRate: data.errorCount / data.totalCalls,
  }));
};

export const useApiData = (timeRange, selectedModel) => {
  return useQuery({
    queryKey: ['apiData', timeRange, selectedModel],
    queryFn: () => fetchApiData(timeRange, selectedModel),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};

// Path: src/features/dashboard/hooks.js