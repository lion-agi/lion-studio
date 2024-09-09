import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/supabase';

const fetchApiData = async (timeRange, customDateRange) => {
  let startDate, endDate;

  switch (timeRange) {
    case '24h':
      startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      break;
    case 'custom':
      startDate = customDateRange.from;
      endDate = customDateRange.to;
      break;
    default:
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  }

  endDate = endDate || new Date();

  const { data, error } = await supabase
    .from('api_calls')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) throw error;

  const summary = calculateSummary(data);
  const costTrend = calculateCostTrend(data);
  const costBreakdown = calculateCostBreakdown(data);

  return {
    summary,
    costTrend,
    costBreakdown,
    recentCalls: data.slice(-100).reverse(), // Get the last 100 calls, most recent first
  };
};

const calculateSummary = (data) => {
  const totalCost = data.reduce((sum, call) => sum + call.cost, 0);
  const totalCalls = data.length;
  const avgResponseTime = data.reduce((sum, call) => sum + call.response_time, 0) / totalCalls;
  const avgCost = totalCost / totalCalls;

  // Calculate changes (you might want to compare with previous period)
  const costChange = 0; // Placeholder
  const callsChange = 0; // Placeholder
  const responseTimeChange = 0; // Placeholder
  const avgCostChange = 0; // Placeholder

  return {
    totalCost,
    totalCalls,
    avgResponseTime,
    avgCost,
    costChange,
    callsChange,
    responseTimeChange,
    avgCostChange,
  };
};

const calculateCostTrend = (data) => {
  const trendData = data.reduce((acc, call) => {
    const date = call.created_at.split('T')[0];
    if (!acc[date]) {
      acc[date] = { date, totalCost: 0, totalCalls: 0, avgResponseTime: 0, callCount: 0 };
    }
    acc[date].totalCost += call.cost;
    acc[date].totalCalls += 1;
    acc[date].avgResponseTime += call.response_time;
    acc[date].callCount += 1;
    return acc;
  }, {});

  return Object.values(trendData).map(day => ({
    ...day,
    avgResponseTime: day.avgResponseTime / day.callCount,
    avgCost: day.totalCost / day.callCount,
  }));
};

const calculateCostBreakdown = (data) => {
  return data.reduce((acc, call) => {
    if (!acc[call.model]) {
      acc[call.model] = 0;
    }
    acc[call.model] += call.cost;
    return acc;
  }, {});
};

export const useApiData = (timeRange, customDateRange) => {
  return useQuery({
    queryKey: ['apiData', timeRange, customDateRange],
    queryFn: () => fetchApiData(timeRange, customDateRange),
  });
};