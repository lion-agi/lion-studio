import React, { useMemo } from 'react';
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

export const useApiCallsByDateRange = (startTimestamp, endTimestamp, options = {}) => {
    const now = Math.floor(Date.now() / 1000);
    const defaultEndTimestamp = now;
    const defaultStartTimestamp = now - 7 * 24 * 60 * 60; // 7 days ago

    const start = startTimestamp || defaultStartTimestamp;
    const end = endTimestamp || defaultEndTimestamp;

    return useQuery({
        queryKey: ['apiCalls', start, end],
        queryFn: async () => {
            try {
                const startDate = new Date(start * 1000).toISOString();
                const endDate = new Date(end * 1000).toISOString();
                
                const query = supabase.from('api_calls')
                    .select('*')
                    .gte('created_at', startDate)
                    .lte('created_at', endDate)
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
    const { data: apiCalls, isLoading, error } = useApiCallsByDateRange(startTimestamp, endTimestamp, options);

    const stats = useMemo(() => {
        if (!apiCalls) return null;

        const totalCalls = apiCalls.length;
        const totalCost = apiCalls.reduce((sum, call) => sum + parseFloat(call.cost), 0);
        const totalTokens = apiCalls.reduce((sum, call) => sum + call.tokens, 0);
        const avgResponseTime = apiCalls.reduce((sum, call) => sum + call.response_time, 0) / totalCalls || 0;

        return {
            totalCalls,
            totalCost,
            totalTokens,
            avgResponseTime,
        };
    }, [apiCalls]);

    return { stats, isLoading, error };
};