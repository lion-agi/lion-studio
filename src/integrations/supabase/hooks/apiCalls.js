import React, { useMemo } from 'react';
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

export const useApiCallsByDateRange = (startDate, endDate, options = {}) => {
    return useQuery({
        queryKey: ['apiCalls', startDate, endDate],
        queryFn: async () => {
            try {
                const query = supabase.from('api_calls')
                    .select('*')
                    .gte('created_at', startDate.toISOString())
                    .lte('created_at', endDate.toISOString())
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

export const useApiCallStats = (startDate, endDate, options = {}) => {
    const { data: apiCalls, isLoading, error } = useApiCallsByDateRange(startDate, endDate, options);

    const stats = useMemo(() => {
        if (!apiCalls) return null;

        const totalCalls = apiCalls.length;
        const totalCost = apiCalls.reduce((sum, call) => sum + parseFloat(call.cost), 0);
        const totalTokens = apiCalls.reduce((sum, call) => sum + call.tokens, 0);
        const avgResponseTime = apiCalls.reduce((sum, call) => sum + call.response_time, 0) / totalCalls || 0;

        const costByModel = apiCalls.reduce((acc, call) => {
            acc[call.model] = (acc[call.model] || 0) + parseFloat(call.cost);
            return acc;
        }, {});

        const costTrend = apiCalls.reduce((acc, call) => {
            const date = call.created_at.split('T')[0];
            acc[date] = (acc[date] || 0) + parseFloat(call.cost);
            return acc;
        }, {});

        const costTrendArray = Object.entries(costTrend).map(([date, cost]) => ({ date, cost }));

        return {
            totalCalls,
            totalCost,
            totalTokens,
            avgResponseTime,
            costByModel,
            costTrend: costTrendArray,
            recentCalls: apiCalls.slice(0, 100), // Get the 100 most recent calls
        };
    }, [apiCalls]);

    return { stats, isLoading, error };
};