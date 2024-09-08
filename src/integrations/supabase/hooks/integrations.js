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
                is_active: true,
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
        mutationFn: async ({ id, is_active }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return await fromSupabase(supabase.from('integrations').update({ is_active, updated_at: new Date().toISOString() }).eq('id', id).eq('user_id', user.id).select());
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