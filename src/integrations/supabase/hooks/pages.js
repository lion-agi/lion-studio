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
    queryFn: async () => {
        // Check if the table exists
        const { data: tableExists, error: tableError } = await supabase
            .from('information_schema.tables')
            .select('table_name')
            .eq('table_name', 'pages')
            .single();

        if (tableError || !tableExists) {
            throw new Error('The pages table does not exist. Please create it first.');
        }

        // If the table exists, fetch the data
        return fromSupabase(supabase.from('pages').select('*'));
    },
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
        mutationFn: (newPage) => fromSupabase(supabase.from('pages').insert([newPage])),
        onSuccess: () => {
            queryClient.invalidateQueries('pages');
        },
    });
};

export const useUpdatePage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pages').update(updateData).eq('id', id)),
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

// Function to create the pages table and add sample data
export const createPagesTableWithSampleData = async () => {
    // Create the pages table
    const { error: createError } = await supabase.rpc('create_pages_table');
    if (createError) throw createError;

    // Add sample data
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
        }
    ];

    const { error: insertError } = await supabase.from('pages').insert(samplePages);
    if (insertError) throw insertError;
};