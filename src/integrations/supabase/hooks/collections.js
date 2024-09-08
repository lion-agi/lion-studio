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

export const useCollections = (options = {}) => useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('collections').select('*').order('created_at', { ascending: false }));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching collections:', error);
            }
            console.error('Error fetching collections:', error);
            throw error;
        }
    },
    ...options,
});

export const useCollection = (id, options = {}) => useQuery({
    queryKey: ['collections', id],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('collections').select('*').eq('id', id).single());
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching collection:', error);
            }
            console.error('Error fetching collection:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newCollection) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const collectionWithUser = { 
                ...newCollection, 
                id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_active: true,
            };
            try {
                return await fromSupabase(supabase.from('collections').insert([collectionWithUser]).select());
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding collection:', error);
                }
                console.error('Error adding collection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('collections');
        },
    });
};

export const useUpdateCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const updatedCollection = {
                ...updates,
                last_activity_at: new Date().toISOString(),
            };
            try {
                return await fromSupabase(supabase.from('collections').update(updatedCollection).eq('id', id).eq('user_id', user.id).select());
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error updating collection:', error);
                }
                console.error('Error updating collection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('collections');
        },
    });
};

export const useDeleteCollection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data: { user } } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return await fromSupabase(supabase.from('collections').delete().eq('id', id).eq('user_id', user.id));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error deleting collection:', error);
                }
                console.error('Error deleting collection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('collections');
        },
    });
};
