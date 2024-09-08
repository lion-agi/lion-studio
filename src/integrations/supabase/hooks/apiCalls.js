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

/*
SQL Table Schema for api_calls:

CREATE TABLE api_calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    base_url TEXT NOT NULL,
    tokens INTEGER NOT NULL,
    cost DECIMAL(10, 5) NOT NULL,
    response_time INTEGER NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_calls_created_at ON api_calls(created_at);
*/

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

export const useApiCallsByDateRange = (startDate, endDate, options = {}) => useQuery({
    queryKey: ['apiCalls', startDate, endDate],
    queryFn: async () => {
        try {
            return await fromSupabase(
                supabase.from('api_calls')
                    .select('*')
                    .gte('created_at', startDate)
                    .lte('created_at', endDate)
                    .order('created_at', { ascending: false })
            );
        } catch (error) {
            console.error('Error fetching API calls by date range:', error);
            throw error;
        }
    },
    ...options,
});

export const useApiCallStats = (options = {}) => {
    const sevenDaysAgo = new Date().getUTCDate();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const defaultStartDate = sevenDaysAgo;
    const defaultEndDate = new Date().getUTCDay();

    return useQuery({
        queryKey: ['apiCallStats', defaultStartDate, defaultEndDate],
        queryFn: async () => {
            try {
                const { data, error } = await supabase
                    .from('api_calls')
                    .select('cost, response_time, tokens')
                    .gte('created_at', defaultStartDate)
                    .lte('created_at', defaultEndDate);

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