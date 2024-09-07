import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw error;
    return data;
};

export const useDataSources = (options = {}) => useQuery({
    queryKey: ['dataSources'],
    queryFn: async () => {
        try {
            const { data, error } = await supabase.from('data_sources').select('*');
            if (error) {
                console.error('Error fetching data sources:', error);
                return [];
            }
            return data;
        } catch (error) {
            console.error('Unexpected error:', error);
            return [];
        }
    },
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

export const createDataSourcesTableWithSampleData = async () => {
    try {
        // Check if the table exists
        const { data: existingTable, error: checkError } = await supabase
            .from('data_sources')
            .select('id')
            .limit(1);

        if (checkError) {
            console.error('Error checking data_sources table:', checkError);
            return;
        }

        // If the table doesn't exist, create it
        if (!existingTable || existingTable.length === 0) {
            const { error: createError } = await supabase.rpc('create_data_sources_table');
            if (createError) {
                console.error('Error creating data_sources table:', createError);
                return;
            }
            console.log('data_sources table created successfully');
        }

        // Add sample data
        const sampleDataSources = [
            {
                name: 'Customer Database',
                type_id: 1,
                description: 'Main customer database for CRM',
                is_active: true,
                health_status: 'Healthy',
                configuration: { host: 'db.example.com', port: 5432 },
                credentials: { username: 'readonly_user' },
                metadata: { tables: ['customers', 'orders', 'products'] }
            },
            {
                name: 'Sales API',
                type_id: 2,
                description: 'External API for sales data',
                is_active: true,
                health_status: 'Degraded',
                configuration: { base_url: 'https://api.sales.example.com/v1' },
                credentials: { api_key: 'sample_key' },
                metadata: { endpoints: ['/sales', '/products', '/customers'] }
            }
        ];

        const { error: insertError } = await supabase.from('data_sources').insert(sampleDataSources);
        if (insertError) {
            console.error('Error inserting sample data:', insertError);
        } else {
            console.log('Sample data inserted successfully');
        }
    } catch (error) {
        console.error('Unexpected error in createDataSourcesTableWithSampleData:', error);
    }
};