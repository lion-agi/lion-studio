import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw error;
    }
    return data;
};

export const useApiCalls = (options = {}) => useQuery({
    queryKey: ['apiCalls'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('api_calls').select('*').order('created_at', { ascending: false }));
        } catch (error) {
            console.error('Error fetching API calls:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddApiCall = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newApiCall) => {
            try {
                const { data, error } = await supabase.from('api_calls').insert([newApiCall]).select();
                if (error) throw error;
                return data[0];
            } catch (error) {
                console.error('Error adding API call:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('apiCalls');
        },
    });
};

export const useApiCallsByDateRange = (startTimestamp, endTimestamp, options = {}) => useQuery({
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

export const useApiCallStats = (options = {}) => {
    const sevenDaysAgoTimestamp = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    return useQuery({
        queryKey: ['apiCallStats', sevenDaysAgoTimestamp, currentTimestamp],
        queryFn: async () => {
            try {
                const { data, error } = await supabase
                    .from('api_calls')
                    .select('cost, response_time, tokens')
                    .gte('created_at', new Date(sevenDaysAgoTimestamp * 1000).toISOString())
                    .lte('created_at', new Date(currentTimestamp * 1000).toISOString());

                if (error) throw error;

                // Calculate stats on the client side
                const totalCalls = data.length;
                const totalCost = data.reduce((sum, call) => sum + parseFloat(call.cost), 0);
                const totalTokens = data.reduce((sum, call) => sum + call.tokens, 0);
                const avgResponseTime = data.reduce((sum, call) => sum + call.response_time, 0) / totalCalls || 0;

                return {
                    totalCalls,
                    totalCost,
                    totalTokens,
                    avgResponseTime,
                };
            } catch (error) {
                console.error('Error fetching API call stats:', error);
                throw error;
            }
        },
        ...options,
    });
};