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
Pages Table Structure:

- id: UUID (Primary Key)
- title: VARCHAR(255)
- content: TEXT
- summary: TEXT
- topic: TEXT
- tags: TEXT[]
- is_active: BOOLEAN
- user_id: UUID (Foreign Key to auth.users)
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
- metadata: JSONB

Indexes on: user_id, created_at
Full-text search on: title, content
*/

export const usePages = (options = {}) => useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
        try {
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return data;
        } catch (error) {
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
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
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
                user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_active: true,
            };
            
            const { data, error } = await supabase
                .from('pages')
                .insert([pageWithUser])
                .select();
            
            if (error) throw error;
            return data[0];
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
                updated_at: new Date().toISOString(),
            };
            
            const { data, error } = await supabase
                .from('pages')
                .update(updatedPage)
                .eq('id', id)
                .eq('user_id', user.id)
                .select();
            
            if (error) throw error;
            return data[0];
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
            
            const { error } = await supabase
                .from('pages')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);
            
            if (error) throw error;
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
                const { data, error } = await supabase.rpc('search_pages', { search_query: searchQuery });
                if (error) throw error;
                return data;
            } catch (error) {
                console.error('Error searching pages:', error);
                throw error;
            }
        },
    });
};

// Set up real-time subscriptions
export const setupPagesSubscription = (callback) => {
    const subscription = supabase
        .channel('pages_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'pages' }, (payload) => {
            callback(payload);
        })
        .subscribe();

    return () => {
        supabase.removeChannel(subscription);
    };
};

// Webhook function to handle external triggers
export const triggerWebhook = async (webhookUrl, payload) => {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error triggering webhook:', error);
        throw error;
    }
};