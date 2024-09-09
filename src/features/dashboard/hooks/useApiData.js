import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/supabase';
import { subHours, subDays, startOfDay, endOfDay } from 'date-fns';

const calculateDateRange = (preset) => {
  const now = new Date();
  switch (preset) {
    case '24h':
      return { from: subHours(now, 24), to: now };
    case '7d':
      return { from: subDays(now, 7), to: now };
    case '30d':
      return { from: subDays(now, 30), to: now };
    case '90d':
      return { from: subDays(now, 90), to: now };
    default:
      return { from: null, to: null };
  }
};

export const useApiData = (dateRange) => {
  const [timeRange, setTimeRange] = useState(calculateDateRange(dateRange.preset));

  useEffect(() => {
    if (dateRange.preset === 'custom') {
      setTimeRange({
        from: dateRange.from ? startOfDay(dateRange.from) : null,
        to: dateRange.to ? endOfDay(dateRange.to) : null,
      });
    } else {
      setTimeRange(calculateDateRange(dateRange.preset));
    }
  }, [dateRange]);

  return useQuery({
    queryKey: ['apiData', timeRange],
    queryFn: async () => {
      let query = supabase.from('api_calls').select('*');

      if (timeRange.from) {
        query = query.gte('created_at', timeRange.from.toISOString());
      }
      if (timeRange.to) {
        query = query.lte('created_at', timeRange.to.toISOString());
      }

      const { data, error } = await query.order('created_at', { ascending: true });

      if (error) throw error;

      let cumulativeCalls = 0;
      let cumulativeCost = 0;
      let totalResponseTime = 0;

      const processedData = data.map((call, index) => {
        cumulativeCalls += 1;
        cumulativeCost += call.cost;
        totalResponseTime += call.response_time;

        return {
          ...call,
          cumulativeCalls,
          cumulativeCost,
          avgResponseTime: totalResponseTime / (index + 1),
        };
      });

      return processedData;
    },
    enabled: !!timeRange.from && !!timeRange.to,
  });
};