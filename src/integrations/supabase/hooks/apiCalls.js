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
    error BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
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

export const useApiCallStats = (options = {}) => useQuery({
    queryKey: ['apiCallStats'],
    queryFn: async () => {
        try {
            const { data, error } = await supabase
                .from('api_calls')
                .select(`
                    count(*),
                    sum(cost),
                    avg(response_time),
                    sum(case when error then 1 else 0 end)::float / nullif(count(*), 0) as error_rate
                `)
                .single();

            if (error) throw error;

            return {
                totalCalls: data.count,
                totalCost: data.sum,
                avgResponseTime: data.avg,
                errorRate: data.error_rate || 0,
            };
        } catch (error) {
            console.error('Error fetching API call stats:', error);
            throw error;
        }
    },
    retry: 3,
    retryDelay: 10000, // 10 seconds
    ...options,
});