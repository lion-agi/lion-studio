import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw error;
    }
    return data;
};

// SQL Schema for connections table:
// CREATE TABLE connections (
//   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//   user_id UUID REFERENCES auth.users(id),
//   name TEXT NOT NULL,
//   type TEXT NOT NULL,
//   host TEXT,
//   port INTEGER,
//   database TEXT,
//   username TEXT,
//   password TEXT,
//   is_active BOOLEAN DEFAULT true,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// Fetch all connections
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

// Fetch a single connection by ID
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

// Add a new connection
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

// Update an existing connection
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

// Delete a connection
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