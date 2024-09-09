import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/supabase';

export const useApiData = (timeRange, selectedModel) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch API calls data
        const { data: apiCalls, error: apiCallsError } = await supabase
          .from('api_calls')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (apiCallsError) throw apiCallsError;

        // Fetch API stats
        const { data: apiStats, error: apiStatsError } = await supabase
          .rpc('get_api_stats', { time_range: timeRange, model: selectedModel });

        if (apiStatsError) throw apiStatsError;

        // Process and format the data
        const processedData = {
          summary: {
            totalCost: apiStats.total_cost,
            totalCalls: apiStats.total_calls,
            avgResponseTime: apiStats.avg_response_time,
            errorRate: apiStats.error_rate,
          },
          costTrend: apiCalls.map(call => ({
            date: call.created_at.split('T')[0],
            cost: call.cost,
          })),
          costBreakdown: [
            { model: 'gpt-3.5-turbo', cost: apiStats.gpt_3_5_cost },
            { model: 'gpt-4', cost: apiStats.gpt_4_cost },
            { model: 'other', cost: apiStats.other_models_cost },
          ],
          performance: apiCalls.map(call => ({
            date: call.created_at.split('T')[0],
            responseTime: call.response_time,
            errorRate: call.error ? 1 : 0,
          })),
          recentCalls: apiCalls,
        };

        setData(processedData);
      } catch (error) {
        console.error('Error fetching API data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange, selectedModel]);

  return { data, isLoading, error };
};