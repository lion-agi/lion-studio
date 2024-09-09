import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/supabase';

const fetchApiCalls = async () => {
  const { data, error } = await supabase
    .from('api_calls')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) throw error;
  return data;
};

const calculateSummary = (apiCalls) => {
  const totalCalls = apiCalls.length;
  const totalCost = apiCalls.reduce((sum, call) => sum + (call.cost || 0), 0);
  const avgResponseTime = apiCalls.reduce((sum, call) => sum + (call.response_time || 0), 0) / totalCalls;
  const errorRate = apiCalls.filter(call => call.error).length / totalCalls;

  return {
    totalCalls,
    totalCost,
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

export const useApiData = (options = {}) => {
  return useQuery({
    queryKey: ['apiData'],
    queryFn: async () => {
      const apiCalls = await fetchApiCalls();
      return {
        summary: calculateSummary(apiCalls),
        costTrend: calculateCostTrend(apiCalls),
        costBreakdown: calculateCostBreakdown(apiCalls),
        recentCalls: apiCalls,
      };
    },
    ...options,
  });
};