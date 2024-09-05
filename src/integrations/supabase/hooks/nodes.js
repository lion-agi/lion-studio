import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### nodes

| name           | type                     | format | required |
|----------------|--------------------------|--------|----------|
| id             | uuid                     | string | true     |
| user_id        | uuid                     | string | true     |
| type           | text                     | string | true     |
| label          | text                     | string | true     |
| position_x     | integer                  | number | true     |
| position_y     | integer                  | number | true     |
| data           | jsonb                    | json   | false    |
| created_at     | timestamp with time zone | string | true     |
| updated_at     | timestamp with time zone | string | true     |

Foreign key relationships:
- user_id references users.id
*/

export const useNodes = (userId) => useQuery({
    queryKey: ['nodes', userId],
    queryFn: () => fromSupabase(supabase.from('nodes').select('*').eq('user_id', userId))
});

export const useAddNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newNode) => fromSupabase(supabase.from('nodes').insert([newNode])),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['nodes', variables.user_id]);
        },
    });
};

export const useUpdateNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('nodes').update(updateData).eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['nodes', variables.user_id]);
        },
    });
};

export const useDeleteNode = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('nodes').delete().eq('id', id)),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['nodes', variables.user_id]);
        },
    });
};