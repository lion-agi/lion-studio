import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
    }
    return data;
};

/*
### users

| name           | type                     | format | required |
|----------------|--------------------------|--------|----------|
| id             | uuid                     | string | true     |
| created_at     | timestamp with time zone | string | true     |
| user_name      | text                     | string | false    |
| user_password  | character varying        | string | false    |

No foreign key relationships identified.
*/

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('users').select('*'));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching users:', error);
            }
            console.error('Error fetching users:', error);
            throw error;
        }
    }
});

export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
        try {
            return await fromSupabase(supabase.from('users').select('*').eq('id', id).single());
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching user:', error);
            }
            console.error('Error fetching user:', error);
            throw error;
        }
    }
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newUser) => {
            try {
                return await fromSupabase(supabase.from('users').insert([newUser]));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding user:', error);
                }
                console.error('Error adding user:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updateData }) => {
            try {
                return await fromSupabase(supabase.from('users').update(updateData).eq('id', id));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error updating user:', error);
                }
                console.error('Error updating user:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            try {
                return await fromSupabase(supabase.from('users').delete().eq('id', id));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error deleting user:', error);
                }
                console.error('Error deleting user:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};
