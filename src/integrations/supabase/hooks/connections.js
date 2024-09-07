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

export const useConnections = (options = {}) => useQuery({
    queryKey: ['connections'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('connections').select('*').order('created_at', { ascending: false }));
        } catch (error) {
            console.error('Error fetching connections:', error);
            throw error;
        }
    },
    ...options,
});

export const useConnection = (id, options = {}) => useQuery({
    queryKey: ['connections', id],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('connections').select('*').eq('id', id).single());
        } catch (error) {
            console.error('Error fetching connection:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddConnection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newConnection) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const connectionWithUser = { 
                ...newConnection, 
                user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_active: true,
            };
            try {
                return await fromSupabase(supabase.from('connections').insert([connectionWithUser]).select());
            } catch (error) {
                console.error('Error adding connection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('connections');
        },
    });
};

export const useUpdateConnection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const updatedConnection = {
                ...updates,
                updated_at: new Date().toISOString(),
            };
            try {
                return await fromSupabase(supabase.from('connections').update(updatedConnection).eq('id', id).eq('user_id', user.id).select());
            } catch (error) {
                console.error('Error updating connection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('connections');
        },
    });
};

export const useDeleteConnection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return await fromSupabase(supabase.from('connections').delete().eq('id', id).eq('user_id', user.id));
            } catch (error) {
                console.error('Error deleting connection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('connections');
        },
    });
};