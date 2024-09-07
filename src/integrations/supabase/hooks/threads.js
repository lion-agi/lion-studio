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

const createThreadsTable = async () => {
    const { error } = await supabase.from('threads').select('*').limit(1);
    if (error && error.code === '42P01') {
        console.log('The threads table does not exist. Creating it now...');
        const { error: createError } = await supabase.rpc('exec', {
            query: `
                CREATE TABLE IF NOT EXISTS threads (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    title TEXT NOT NULL,
                    topic TEXT,
                    summary TEXT,
                    is_active BOOLEAN DEFAULT true,
                    metadata JSONB,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `
        });
        if (createError) throw createError;
        console.log('Threads table created successfully.');
    } else if (error) {
        throw error;
    }
};

export const useThreads = (options = {}) => useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
        try {
            await createThreadsTable();
            return fromSupabase(supabase.from('threads').select('*'));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching threads:', error);
            }
            console.error('Error fetching threads:', error);
            throw error;
        }
    },
    ...options,
});

export const useThread = (id, options = {}) => useQuery({
    queryKey: ['threads', id],
    queryFn: async () => {
        try {
            return fromSupabase(supabase.from('threads').select('*').eq('id', id).single());
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching thread:', error);
            }
            console.error('Error fetching thread:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newThread) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            const threadWithUser = { ...newThread, user_id: user.id };
            try {
                return fromSupabase(supabase.from('threads').insert([threadWithUser]).select());
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding thread:', error);
                }
                console.error('Error adding thread:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useUpdateThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return fromSupabase(supabase.from('threads').update(updates).eq('id', id).eq('user_id', user.id).select());
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error updating thread:', error);
                }
                console.error('Error updating thread:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');
            try {
                return fromSupabase(supabase.from('threads').delete().eq('id', id).eq('user_id', user.id));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error deleting thread:', error);
                }
                console.error('Error deleting thread:', error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useThreadParticipants = (threadId, options = {}) => useQuery({
    queryKey: ['threadParticipants', threadId],
    queryFn: async () => {
        try {
            return fromSupabase(supabase.from('thread_participants').select('participants(*)').eq('thread_id', threadId));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching thread participants:', error);
            }
            console.error('Error fetching thread participants:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddThreadParticipant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ threadId, participantId }) => {
            try {
                return fromSupabase(supabase.from('thread_participants').insert([{ thread_id: threadId, participant_id: participantId }]));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding thread participant:', error);
                }
                console.error('Error adding thread participant:', error);
                throw error;
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['threadParticipants', variables.threadId]);
        },
    });
};

export const useThreadMessages = (threadId, options = {}) => useQuery({
    queryKey: ['threadMessages', threadId],
    queryFn: async () => {
        try {
            return fromSupabase(supabase.from('messages').select('*').eq('thread_id', threadId).order('created_at', { ascending: true }));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching thread messages:', error);
            }
            console.error('Error fetching thread messages:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newMessage) => {
            try {
                return fromSupabase(supabase.from('messages').insert([newMessage]));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding message:', error);
                }
                console.error('Error adding message:', error);
                throw error;
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['threadMessages', variables.thread_id]);
        },
    });
};

export const useThreadTags = (threadId, options = {}) => useQuery({
    queryKey: ['threadTags', threadId],
    queryFn: async () => {
        try {
            return fromSupabase(supabase.from('thread_tag_associations').select('thread_tags(*)').eq('thread_id', threadId));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching thread tags:', error);
            }
            console.error('Error fetching thread tags:', error);
            throw error;
        }
    },
    ...options,
});

export const useAddThreadTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ threadId, tagId }) => {
            try {
                return fromSupabase(supabase.from('thread_tag_associations').insert([{ thread_id: threadId, tag_id: tagId }]));
            } catch (error) {
                if (error.status === 404) {
                    console.error('404 error adding thread tag:', error);
                }
                console.error('Error adding thread tag:', error);
                throw error;
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['threadTags', variables.threadId]);
        },
    });
};

export const useThreadSummary = (threadId, options = {}) => useQuery({
    queryKey: ['threadSummary', threadId],
    queryFn: async () => {
        try {
            return fromSupabase(supabase.rpc('get_thread_summary', { thread_id: threadId }));
        } catch (error) {
            if (error.status === 404) {
                console.error('404 error fetching thread summary:', error);
            }
            console.error('Error fetching thread summary:', error);
            throw error;
        }
    },
    ...options,
});

// Function to create the threads table and add sample data
export const createThreadsTableWithSampleData = async () => {
    await createThreadsTable();

    // Add sample data
    const sampleThreads = [
        {
            title: 'Workflow Optimization Discussion',
            topic: 'Optimization',
            summary: 'A thread to discuss various workflow optimization techniques.',
            is_active: true,
            metadata: { participants: 3, messages: 10 }
        },
        {
            title: 'New Feature Requests',
            topic: 'Feature Requests',
            summary: 'Collecting and discussing new feature ideas for Lion Studio.',
            is_active: true,
            metadata: { participants: 5, messages: 15 }
        }
    ];

    const { error: insertError } = await supabase.from('threads').insert(sampleThreads);
    if (insertError) throw insertError;
};
