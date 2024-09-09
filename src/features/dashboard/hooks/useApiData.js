import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/supabase';

const fetchApiData = async () => {
  // Fetch summary data
  const { data: summaryData, error: summaryError } = await supabase
    .from('api_summary')
    .select('*')
    .single();

  if (summaryError) throw new Error('Failed to fetch summary data');

  // Fetch cost trend data
  const { data: costTrendData, error: costTrendError } = await supabase
    .from('cost_trend')
    .select('*')
    .order('date', { ascending: true });

  if (costTrendError) throw new Error('Failed to fetch cost trend data');

  // Fetch cost breakdown data
  const { data: costBreakdownData, error: costBreakdownError } = await supabase
    .from('cost_breakdown')
    .select('*');

  if (costBreakdownError) throw new Error('Failed to fetch cost breakdown data');

  // Fetch recent calls data
  const { data: recentCallsData, error: recentCallsError } = await supabase
    .from('api_calls')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (recentCallsError) throw new Error('Failed to fetch recent calls data');

  return {
    summary: summaryData,
    costTrend: costTrendData,
    costBreakdown: costBreakdownData,
    recentCalls: recentCallsData,
  };
};

export const useApiData = () => {
  return useQuery({
    queryKey: ['apiData'],
    queryFn: fetchApiData,
    refetchInterval: 60000, // Refetch every minute
  });
};