import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

export const useDataSources = () => useQuery({
    queryKey: ['data_sources'],
    queryFn: async () => {
        try {
            const data = await fromSupabase(supabase.from('data_sources').select('*'));
            // Group data sources by type
            return data.reduce((acc, source) => {
                if (!acc[source.type]) {
                    acc[source.type] = [];
                }
                acc[source.type].push(source);
                return acc;
            }, {});
        } catch (error) {
            console.error('Error fetching data sources:', error);
            throw error;
        }
    },
});

export const useDataSource = (id) => useQuery({
    queryKey: ['data_sources', id],
    queryFn: () => fromSupabase(supabase.from('data_sources').select('*').eq('id', id).single()),
});

export const useAddDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDataSource) => fromSupabase(supabase.from('data_sources').insert([newDataSource])),
        onSuccess: () => {
            queryClient.invalidateQueries('data_sources');
        },
    });
};

export const useUpdateDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('data_sources').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('data_sources');
        },
    });
};

export const useDeleteDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('data_sources').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('data_sources');
        },
    });
};