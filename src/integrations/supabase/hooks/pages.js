import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw error;
    return data;
};

/*
### pages

| name           | type                     | format | required |
|----------------|--------------------------|--------|----------|
| id             | uuid                     | string | true     |
| title          | varchar(255)             | string | true     |
| content        | text                     | string | true     |
| category       | varchar(100)             | string | false    |
| tags           | text[]                   | array  | false    |
| status         | varchar(20)              | string | true     |
| author         | varchar(100)             | string | true     |
| created_at     | timestamp with time zone | string | true     |
| updated_at     | timestamp with time zone | string | true     |

No foreign key relationships identified.
*/

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
        mutationFn: (newPage) => fromSupabase(supabase.from('pages').insert([newPage]).select()),
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useUpdatePage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pages').update(updateData).eq('id', id).select()),
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useDeletePage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pages').delete().eq('id', id)),
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

// Function to add sample data to the pages table
export const addSamplePages = async () => {
    const samplePages = [
        {
            title: 'Getting Started with Lion Studio',
            content: 'Welcome to Lion Studio! This guide will help you get started with our powerful workflow automation platform.',
            category: 'Tutorial',
            tags: ['beginner', 'introduction'],
            status: 'published',
            author: 'Lion Team'
        },
        {
            title: 'Advanced Workflow Techniques',
            content: 'Learn advanced techniques to optimize your workflows and increase productivity using Lion Studio.',
            category: 'Advanced',
            tags: ['workflow', 'optimization'],
            status: 'published',
            author: 'Jane Doe'
        },
        {
            title: 'Integrating External APIs',
            content: 'Discover how to seamlessly integrate external APIs into your Lion Studio workflows for enhanced functionality.',
            category: 'Integration',
            tags: ['api', 'integration'],
            status: 'draft',
            author: 'John Smith'
        }
    ];

    const { error } = await supabase.from('pages').insert(samplePages);
    if (error) throw error;
};