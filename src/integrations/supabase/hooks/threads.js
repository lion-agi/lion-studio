import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### threads

| name             | type                     | format | required |
|------------------|--------------------------|--------|----------|
| id               | bigint                   | number | true     |
| title            | varchar(255)             | string | false    |
| created_at       | timestamp with time zone | string | true     |
| last_activity_at | timestamp with time zone | string | true     |
| is_active        | boolean                  | boolean| true     |
| topic            | varchar(100)             | string | false    |
| summary          | text                     | string | false    |
| metadata         | jsonb                    | object | false    |

No foreign key relationships identified.
*/

export const useThreads = (options = {}) => useQuery({
    queryKey: ['threads'],
    queryFn: () => fromSupabase(supabase.from('threads').select('*')),
    ...options,
});

export const useThread = (id, options = {}) => useQuery({
    queryKey: ['threads', id],
    queryFn: () => fromSupabase(supabase.from('threads').select('*').eq('id', id).single()),
    ...options,
});

export const useAddThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newThread) => fromSupabase(supabase.from('threads').insert([newThread])),
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useUpdateThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('threads').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('threads').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('threads');
        },
    });
};

export const useThreadParticipants = (threadId, options = {}) => useQuery({
    queryKey: ['threadParticipants', threadId],
    queryFn: () => fromSupabase(supabase.from('thread_participants').select('participants(*)').eq('thread_id', threadId)),
    ...options,
});

export const useAddThreadParticipant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ threadId, participantId }) => fromSupabase(supabase.from('thread_participants').insert([{ thread_id: threadId, participant_id: participantId }])),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['threadParticipants', variables.threadId]);
        },
    });
};

export const useThreadMessages = (threadId, options = {}) => useQuery({
    queryKey: ['threadMessages', threadId],
    queryFn: () => fromSupabase(supabase.from('messages').select('*').eq('thread_id', threadId).order('created_at', { ascending: true })),
    ...options,
});

export const useAddMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMessage) => fromSupabase(supabase.from('messages').insert([newMessage])),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['threadMessages', variables.thread_id]);
        },
    });
};

export const useThreadTags = (threadId, options = {}) => useQuery({
    queryKey: ['threadTags', threadId],
    queryFn: () => fromSupabase(supabase.from('thread_tag_associations').select('thread_tags(*)').eq('thread_id', threadId)),
    ...options,
});

export const useAddThreadTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ threadId, tagId }) => fromSupabase(supabase.from('thread_tag_associations').insert([{ thread_id: threadId, tag_id: tagId }])),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['threadTags', variables.threadId]);
        },
    });
};

export const useThreadSummary = (threadId, options = {}) => useQuery({
    queryKey: ['threadSummary', threadId],
    queryFn: () => fromSupabase(supabase.rpc('get_thread_summary', { thread_id: threadId })),
    ...options,
});