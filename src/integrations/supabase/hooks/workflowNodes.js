import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowNodes = () => useQuery({
  queryKey: ['workflowNodes'],
  queryFn: () => fromSupabase(supabase.from('workflow_nodes').select('*'))
});

export const useWorkflowNode = (id) => useQuery({
  queryKey: ['workflowNodes', id],
  queryFn: () => fromSupabase(supabase.from('workflow_nodes').select('*').eq('id', id).single())
});

export const useAddWorkflowNode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newNode) => fromSupabase(supabase.from('workflow_nodes').insert([newNode])),
    onSuccess: () => {
      queryClient.invalidateQueries('workflowNodes');
    },
  });
};

export const useUpdateWorkflowNode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('workflow_nodes').update(updateData).eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('workflowNodes');
    },
  });
};

export const useDeleteWorkflowNode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => fromSupabase(supabase.from('workflow_nodes').delete().eq('id', id)),
    onSuccess: () => {
      queryClient.invalidateQueries('workflowNodes');
    },
  });
};