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
SQL Table Schema for collections:

CREATE TABLE collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

COMMENT ON TABLE collections IS 'Stores information about user-created collections';
COMMENT ON COLUMN collections.id IS 'Unique identifier for the collection';
COMMENT ON COLUMN collections.title IS 'Title of the collection';
COMMENT ON COLUMN collections.description IS 'Description of the collection';
COMMENT ON COLUMN collections.created_at IS 'Timestamp when the collection was created';
COMMENT ON COLUMN collections.updated_at IS 'Timestamp when the collection was last updated';
COMMENT ON COLUMN collections.metadata IS 'Additional customizable metadata for the collection';
*/

export const useCollections = (options = {}) => useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('collections').select('*').order('created_at', { ascending: false }));
        } catch (error) {
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
            const collectionWithTimestamp = { 
                ...newCollection, 
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            try {
                return await fromSupabase(supabase.from('collections').insert([collectionWithTimestamp]).select());
            } catch (error) {
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
            const updatedCollection = {
                ...updates,
                updated_at: new Date().toISOString(),
            };
            try {
                return await fromSupabase(supabase.from('collections').update(updatedCollection).eq('id', id).select());
            } catch (error) {
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
            try {
                return await fromSupabase(supabase.from('collections').delete().eq('id', id));
            } catch (error) {
                console.error('Error deleting collection:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('collections');
        },
    });
};