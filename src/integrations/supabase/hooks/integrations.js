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
SQL Table Schema for integrations:

CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Disconnected',
    config JSONB NOT NULL DEFAULT '{}',
    extra JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

COMMENT ON TABLE integrations IS 'Stores information about user integrations';
COMMENT ON COLUMN integrations.id IS 'Unique identifier for the integration';
COMMENT ON COLUMN integrations.name IS 'Name of the integration';
COMMENT ON COLUMN integrations.type IS 'Type of integration (e.g., database, api, cloud)';
COMMENT ON COLUMN integrations.description IS 'Description of the integration';
COMMENT ON COLUMN integrations.status IS 'Current status of the integration';
COMMENT ON COLUMN integrations.config IS 'Configuration details for the integration';
COMMENT ON COLUMN integrations.extra IS 'Additional customizable parameters for the integration';
COMMENT ON COLUMN integrations.created_at IS 'Timestamp when the integration was created';
COMMENT ON COLUMN integrations.updated_at IS 'Timestamp when the integration was last updated';
COMMENT ON COLUMN integrations.user_id IS 'Foreign key referencing the user who owns this integration';
*/

export const useIntegrations = (options = {}) => useQuery({
    queryKey: ['integrations'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('integrations').select('*').order('created_at', { ascending: false }));
        } catch (error) {
            console.error('Error fetching integrations:', error);
            throw error;
        }
    },
    ...options,
});

export const useIntegration = (id, options = {}) => useQuery({
    queryKey: ['integrations', id],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('integrations').select('*').eq('id', id).single());
        } catch (error) {
            console.error('Error fetching integration:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddIntegration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newIntegration) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const integrationWithUser = { 
                ...newIntegration, 
                user_id: user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            try {
                return await fromSupabase(supabase.from('integrations').insert([integrationWithUser]).select());
            } catch (error) {
                console.error('Error adding integration:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('integrations');
        },
    });
};

export const useUpdateIntegration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const updatedIntegration = {
                ...updates,
                updated_at: new Date().toISOString(),
            };
            try {
                return await fromSupabase(supabase.from('integrations').update(updatedIntegration).eq('id', id).eq('user_id', user.id).select());
            } catch (error) {
                console.error('Error updating integration:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('integrations');
        },
    });
};

export const useDeleteIntegration = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return await fromSupabase(supabase.from('integrations').delete().eq('id', id).eq('user_id', user.id));
            } catch (error) {
                console.error('Error deleting integration:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('integrations');
        },
    });
};

export const useToggleIntegrationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return await fromSupabase(supabase.from('integrations').update({ status, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', user.id).select());
            } catch (error) {
                console.error('Error toggling integration status:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('integrations');
        },
    });
};
