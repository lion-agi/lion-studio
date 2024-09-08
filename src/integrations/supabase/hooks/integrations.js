import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

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

Sample data for the integrations table:

INSERT INTO integrations (name, type, description, status, config, extra, user_id) VALUES
(
    'PostgreSQL Database',
    'database',
    'Main production database for our application',
    'Connected',
    '{
        "host": "db.example.com",
        "port": 5432,
        "database": "prod_db",
        "username": "db_user"
    }',
    '{
        "ssl_mode": "require",
        "connection_timeout": 30
    }',
    '123e4567-e89b-12d3-a456-426614174000'
),
(
    'AWS S3 Bucket',
    'cloud',
    'Storage for user-uploaded files',
    'Connected',
    '{
        "bucket_name": "user-uploads",
        "region": "us-west-2"
    }',
    '{
        "access_key_id": "AKIAIOSFODNN7EXAMPLE",
        "secret_access_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
    }',
    '123e4567-e89b-12d3-a456-426614174000'
),
(
    'Stripe API',
    'api',
    'Payment processing integration',
    'Connected',
    '{
        "api_key": "sk_test_4eC39HqLyjWDarjtT1zdp7dc",
        "webhook_secret": "whsec_1234567890"
    }',
    NULL,
    '123e4567-e89b-12d3-a456-426614174000'
),
(
    'Mailchimp',
    'api',
    'Email marketing integration',
    'Disconnected',
    '{
        "api_key": "your-mailchimp-api-key-here",
        "list_id": "abc123def"
    }',
    '{
        "default_from_name": "Our Company",
        "default_from_email": "newsletter@ourcompany.com"
    }',
    '123e4567-e89b-12d3-a456-426614174000'
),
(
    'Google Cloud Storage',
    'cloud',
    'Backup storage for large files',
    'Connected',
    '{
        "project_id": "my-project-123",
        "bucket_name": "large-file-backups"
    }',
    '{
        "service_account_key": {
            "type": "service_account",
            "project_id": "my-project-123",
            "private_key_id": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9...\n-----END PRIVATE KEY-----\n",
            "client_email": "my-service-account@my-project-123.iam.gserviceaccount.com",
            "client_id": "123456789012345678901",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/my-service-account%40my-project-123.iam.gserviceaccount.com"
        }
    }',
    '123e4567-e89b-12d3-a456-426614174000'
);
*/

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