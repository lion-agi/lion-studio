import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw error;
    return data;
};

export const usePages = (options = {}) => useQuery({
    queryKey: ['pages'],
    queryFn: () => fromSupabase(supabase.from('pages').select('*').order('created_at', { ascending: false })),
    ...options,
});

export const usePage = (id, options = {}) => useQuery({
    queryKey: ['pages', id],
    queryFn: () => fromSupabase(supabase.from('pages').select('*').eq('id', id).single()),
    ...options,
});

export const useAddPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newPage) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const pageWithUser = { 
                ...newPage, 
                id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_active: true,
            };
            return fromSupabase(supabase.from('pages').insert([pageWithUser]).select());
        },
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useUpdatePage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const updatedPage = {
                ...updates,
                last_activity_at: new Date().toISOString(),
            };
            return fromSupabase(supabase.from('pages').update(updatedPage).eq('id', id).eq('user_id', user.id).select());
        },
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useDeletePage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            return fromSupabase(supabase.from('pages').delete().eq('id', id).eq('user_id', user.id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useSearchPages = () => {
    return useMutation({
        mutationFn: (searchQuery) => fromSupabase(supabase.rpc('search_pages', { search_query: searchQuery })),
    });
};