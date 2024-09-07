import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### data_sources

| name              | type                     | format | required |
|-------------------|--------------------------|--------|----------|
| id                | int8                     | bigint | true     |
| name              | text                     | string | false    |
| type_id           | int8                     | bigint | false    |
| description       | text                     | string | false    |
| created_at        | timestamp with time zone | string | false    |
| updated_at        | timestamp with time zone | string | false    |
| is_active         | boolean                  | boolean| false    |
| health_status     | text                     | string | false    |
| last_health_check | timestamp with time zone | string | false    |
| configuration     | jsonb                    | object | false    |
| credentials       | jsonb                    | object | false    |
| metadata          | jsonb                    | object | false    |

No foreign key relationships identified.
*/

export const useDataSources = () => useQuery({
    queryKey: ['data_sources'],
    queryFn: () => fromSupabase(supabase.from('data_sources').select('*')),
});

export const useDataSource = (id) => useQuery({
    queryKey: ['data_sources', id],
    queryFn: () => fromSupabase(supabase.from('data_sources').select('*').eq('id', id).single()),
});

export const useAddDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDataSource) => fromSupabase(supabase.from('data_sources').insert([newDataSource])),
        onSuccess: () => {
            queryClient.invalidateQueries('data_sources');
        },
    });
};

export const useUpdateDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updates }) => fromSupabase(supabase.from('data_sources').update(updates).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('data_sources');
        },
    });
};

export const useDeleteDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('data_sources').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('data_sources');
        },
    });
};