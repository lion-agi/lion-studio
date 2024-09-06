import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### pages

| name           | type                     | format | required |
|----------------|--------------------------|--------|----------|
| id             | bigint                   | number | true     |
| title          | varchar(255)             | string | true     |
| slug           | varchar(255)             | string | true     |
| content        | text                     | string | true     |
| author_id      | bigint                   | number | true     |
| created_at     | timestamp with time zone | string | true     |
| updated_at     | timestamp with time zone | string | true     |
| published_at   | timestamp with time zone | string | false    |
| status         | varchar(20)              | string | true     |
| category_id    | bigint                   | number | false    |
| metadata       | jsonb                    | object | false    |

Foreign key relationships:
- author_id references authors(id)
- category_id references categories(id)
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

export const usePageTags = (pageId, options = {}) => useQuery({
    queryKey: ['pageTags', pageId],
    queryFn: () => fromSupabase(supabase.from('page_tags').select('tags(*)').eq('page_id', pageId)),
    ...options,
});

export const useAddPageTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pageId, tagId }) => fromSupabase(supabase.from('page_tags').insert([{ page_id: pageId, tag_id: tagId }])),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['pageTags', variables.pageId]);
        },
    });
};

export const useRemovePageTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pageId, tagId }) => fromSupabase(supabase.from('page_tags').delete().match({ page_id: pageId, tag_id: tagId })),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['pageTags', variables.pageId]);
        },
    });
};

export const useRelatedPages = (pageId, options = {}) => useQuery({
    queryKey: ['relatedPages', pageId],
    queryFn: () => fromSupabase(supabase.from('related_pages').select('related_page_id, pages(*)').eq('page_id', pageId)),
    ...options,
});

export const useAddRelatedPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pageId, relatedPageId, relationshipType }) => 
            fromSupabase(supabase.from('related_pages').insert([{ page_id: pageId, related_page_id: relatedPageId, relationship_type: relationshipType }])),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['relatedPages', variables.pageId]);
        },
    });
};

export const useRemoveRelatedPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ pageId, relatedPageId }) => 
            fromSupabase(supabase.from('related_pages').delete().match({ page_id: pageId, related_page_id: relatedPageId })),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['relatedPages', variables.pageId]);
        },
    });
};