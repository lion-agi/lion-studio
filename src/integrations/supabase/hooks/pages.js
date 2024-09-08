import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';


/*
Pages Table Structure:

- id: UUID (Primary Key)
- title: VARCHAR(255)
- content: TEXT
- summary: text
- topic: text
- tags: text[]
- user_id: UUID
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE

Indexes on: user_id, created_at
Full-text search on: title, content
*/

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw error;
    }
    return data;
};

export const usePages = (options = {}) => useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('pages').select('*').order('created_at', { ascending: false }));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching pages:', error);
            }
            console.error('Error fetching pages:', error);
            throw error;
        }
    },
    ...options,
});

export const usePage = (id, options = {}) => useQuery({
    queryKey: ['pages', id],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('pages').select('*').eq('id', id).single());
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching page:', error);
            }
            console.error('Error fetching page:', error);
            throw error;
        }
    },
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
            try {
                return await fromSupabase(supabase.from('pages').insert([pageWithUser]).select());
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding page:', error);
                }
                console.error('Error adding page:', error);
                throw error;
            }
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
            try {
                return await fromSupabase(supabase.from('pages').update(updatedPage).eq('id', id).eq('user_id', user.id).select());
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error updating page:', error);
                }
                console.error('Error updating page:', error);
                throw error;
            }
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
            try {
                return await fromSupabase(supabase.from('pages').delete().eq('id', id).eq('user_id', user.id));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error deleting page:', error);
                }
                console.error('Error deleting page:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useSearchPages = () => {
    return useMutation({
        mutationFn: async (searchQuery) => {
            try {
                return await fromSupabase(supabase.rpc('search_pages', { search_query: searchQuery }));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error searching pages:', error);
                }
                console.error('Error searching pages:', error);
                throw error;
            }
        },
    });
};
