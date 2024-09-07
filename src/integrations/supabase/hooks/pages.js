import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw error;
    return data;
};

export const usePages = (options = {}) => useQuery({
    queryKey: ['pages'],
    queryFn: () => fromSupabase(supabase.from('pages').select('*')),
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
            const pageWithUser = { ...newPage, user_id: user.id };
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
            return fromSupabase(supabase.from('pages').update(updates).eq('id', id).eq('user_id', user.id).select());
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

export const addSamplePages = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const samplePages = [
        {
            title: 'Getting Started with Lion Studio',
            content: 'Welcome to Lion Studio! This guide will help you get started with our powerful workflow automation platform.',
            category: 'Tutorial',
            tags: ['beginner', 'introduction'],
            status: 'published',
            author: 'Lion Team',
            user_id: user.id
        },
        {
            title: 'Advanced Workflow Techniques',
            content: 'Learn advanced techniques to optimize your workflows and increase productivity using Lion Studio.',
            category: 'Advanced',
            tags: ['workflow', 'optimization'],
            status: 'published',
            author: 'Jane Doe',
            user_id: user.id
        },
        {
            title: 'Integrating External APIs',
            content: 'Discover how to seamlessly integrate external APIs into your Lion Studio workflows for enhanced functionality.',
            category: 'Integration',
            tags: ['api', 'integration'],
            status: 'draft',
            author: 'John Smith',
            user_id: user.id
        }
    ];

    const { error } = await supabase.from('pages').insert(samplePages);
    if (error) throw error;
};