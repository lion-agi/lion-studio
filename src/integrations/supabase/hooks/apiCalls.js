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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_calls_created_at ON api_calls(created_at);

COMMENT ON TABLE api_calls IS 'Stores information about API calls made by users';
COMMENT ON COLUMN api_calls.id IS 'Unique identifier for the API call';
COMMENT ON COLUMN api_calls.created_at IS 'Timestamp of when the API call was made';
COMMENT ON COLUMN api_calls.provider IS 'The API provider (e.g., OpenAI, Anthropic)';
COMMENT ON COLUMN api_calls.model IS 'The specific model used for the API call';
COMMENT ON COLUMN api_calls.endpoint IS 'The API endpoint called';
COMMENT ON COLUMN api_calls.method IS 'The HTTP method used (e.g., GET, POST)';
COMMENT ON COLUMN api_calls.base_url IS 'The base URL of the API';
COMMENT ON COLUMN api_calls.tokens IS 'Number of tokens used in the API call';
COMMENT ON COLUMN api_calls.cost IS 'Cost of the API call';
COMMENT ON COLUMN api_calls.response_time IS 'Response time of the API call in milliseconds';
COMMENT ON COLUMN api_calls.metadata IS 'Additional metadata for the API call';
COMMENT ON COLUMN api_calls.updated_at IS 'Timestamp when the record was last updated';
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
                    sum(case when response_time > 1000 then 1 else 0 end)::float / nullif(count(*), 0) as error_rate
                `)
                .single();

            if (error) throw error;

            return {
                totalCalls: data.count,
                totalCost: data.sum,
                avgResponseTime: data.avg,
                errorRate: data.error_rate,
            };
        } catch (error) {
            console.error('Error fetching API call stats:', error);
            throw error;
        }
    },
    ...options,
});