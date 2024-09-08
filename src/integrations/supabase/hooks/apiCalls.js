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
            const { data, error } = await supabase.from('api_calls').select('*');
            if (error) throw error;
            
            // Calculate stats from the fetched data
            const totalCalls = data.length;
            const totalCost = data.reduce((sum, call) => sum + (call.cost || 0), 0);
            const avgResponseTime = data.reduce((sum, call) => sum + (call.response_time || 0), 0) / totalCalls;
            const errorRate = data.filter(call => call.error).length / totalCalls;

            return {
                totalCalls,
                totalCost,
                avgResponseTime,
                errorRate,
            };
        } catch (error) {
            console.error('Error calculating API call stats:', error);
            throw error;
        }
    },
    ...options,
});
