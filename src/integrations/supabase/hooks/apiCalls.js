import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw error;
    }
    return data;
};

export const useApiCallsByDateRange = (startTimestamp, endTimestamp, options = {}) => {
    return useQuery({
        queryKey: ['apiCalls', startTimestamp, endTimestamp],
        queryFn: async () => {
            try {
                const query = supabase.from('api_calls')
                    .select('*')
                    .gte('created_at', new Date(startTimestamp * 1000).toISOString())
                    .lte('created_at', new Date(endTimestamp * 1000).toISOString())
                    .order('created_at', { ascending: false });

                return await fromSupabase(query);
            } catch (error) {
                console.error('Error fetching API calls by date range:', error);
                throw error;
            }
        },
        ...options,
    });
};

export const useApiCallStats = (startTimestamp, endTimestamp, options = {}) => {
    return useQuery({
        queryKey: ['apiCallStats', startTimestamp, endTimestamp],
        queryFn: async () => {
            try {
                const { data, error } = await supabase.rpc('get_api_call_stats', {
                    start_date: new Date(startTimestamp * 1000).toISOString(),
                    end_date: new Date(endTimestamp * 1000).toISOString()
                });

                if (error) throw error;
                return data;
            } catch (error) {
                console.error('Error fetching API call stats:', error);
                throw error;
            }
        },
        ...options,
    });
};