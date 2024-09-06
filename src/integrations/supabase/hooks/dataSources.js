import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### data_sources

| name           | type                     | format | required |
|----------------|--------------------------|--------|----------|
| id             | bigint                   | number | true     |
| name           | varchar(255)             | string | true     |
| type_id        | integer                  | number | false    |
| description    | text                     | string | false    |
| created_at     | timestamp with time zone | string | true     |
| updated_at     | timestamp with time zone | string | true     |
| is_active      | boolean                  | boolean| true     |
| health_status  | varchar(20)              | string | false    |
| last_health_check | timestamp with time zone | string | false |
| configuration  | jsonb                    | object | false    |
| credentials    | jsonb                    | object | false    |
| metadata       | jsonb                    | object | false    |

Foreign key relationships:
- type_id references data_source_types(id)
*/

export const useDataSources = (options = {}) => useQuery({
    queryKey: ['dataSources'],
    queryFn: () => fromSupabase(supabase.from('data_sources').select('*')),
    ...options,
});

export const useDataSource = (id, options = {}) => useQuery({
    queryKey: ['dataSources', id],
    queryFn: () => fromSupabase(supabase.from('data_sources').select('*').eq('id', id).single()),
    ...options,
});

export const useAddDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDataSource) => fromSupabase(supabase.from('data_sources').insert([newDataSource])),
        onSuccess: () => {
            queryClient.invalidateQueries('dataSources');
        },
    });
};

export const useUpdateDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('data_sources').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dataSources');
        },
    });
};

export const useDeleteDataSource = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('data_sources').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dataSources');
        },
    });
};

export const useDataSourceTypes = (options = {}) => useQuery({
    queryKey: ['dataSourceTypes'],
    queryFn: () => fromSupabase(supabase.from('data_source_types').select('*')),
    ...options,
});

export const useSyncHistory = (dataSourceId, options = {}) => useQuery({
    queryKey: ['syncHistory', dataSourceId],
    queryFn: () => fromSupabase(supabase.from('sync_history').select('*').eq('data_source_id', dataSourceId).order('started_at', { ascending: false })),
    ...options,
});

export const useUsageMetrics = (dataSourceId, options = {}) => useQuery({
    queryKey: ['usageMetrics', dataSourceId],
    queryFn: () => fromSupabase(supabase.from('usage_metrics').select('*').eq('data_source_id', dataSourceId).order('metric_date', { ascending: false })),
    ...options,
});

export const useDataSourceTags = (dataSourceId, options = {}) => useQuery({
    queryKey: ['dataSourceTags', dataSourceId],
    queryFn: () => fromSupabase(supabase.from('data_source_tags').select('tags(*)').eq('data_source_id', dataSourceId)),
    ...options,
});

export const useAddDataSourceTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ dataSourceId, tagId }) => fromSupabase(supabase.from('data_source_tags').insert([{ data_source_id: dataSourceId, tag_id: tagId }])),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['dataSourceTags', variables.dataSourceId]);
        },
    });
};

export const useRemoveDataSourceTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ dataSourceId, tagId }) => fromSupabase(supabase.from('data_source_tags').delete().match({ data_source_id: dataSourceId, tag_id: tagId })),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['dataSourceTags', variables.dataSourceId]);
        },
    });
};

export const useLatestSyncStatus = (dataSourceId, options = {}) => useQuery({
    queryKey: ['latestSyncStatus', dataSourceId],
    queryFn: () => fromSupabase(supabase.rpc('get_latest_sync_status', { ds_id: dataSourceId })),
    ...options,
});

export const useAccessPermissions = (dataSourceId, options = {}) => useQuery({
    queryKey: ['accessPermissions', dataSourceId],
    queryFn: () => fromSupabase(supabase.from('access_permissions').select('*').eq('data_source_id', dataSourceId)),
    ...options,
});

export const useConfigurationVersions = (dataSourceId, options = {}) => useQuery({
    queryKey: ['configurationVersions', dataSourceId],
    queryFn: () => fromSupabase(supabase.from('configuration_versions').select('*').eq('data_source_id', dataSourceId).order('version', { ascending: false })),
    ...options,
});