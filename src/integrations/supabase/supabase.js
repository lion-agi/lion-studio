import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Function to get user profile
export const getUserProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

// Function to update user profile
export const updateUserProfile = async (userId, updates) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
};

// Function to search images
export const searchImages = async (query, page = 1, pageSize = 20) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, error, count } = await supabase
    .from('images')
    .select('*', { count: 'exact' })
    .or(`caption.ilike.%${query}%, tags.cs.{${query}}`)
    .range(start, end);

  if (error) throw error;
  return { data, count };
};

// Function to like an image
export const likeImage = async (imageId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('likes')
    .insert({ image_id: imageId, user_id: user.id });
  if (error) throw error;
  return data;
};

// Function to comment on an image
export const commentOnImage = async (imageId, comment) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('comments')
    .insert({ image_id: imageId, user_id: user.id, content: comment });
  if (error) throw error;
  return data;
};

// Function to get image likes and comments
export const getImageInteractions = async (imageId) => {
  const { data: likes, error: likesError } = await supabase
    .from('likes')
    .select('user_id')
    .eq('image_id', imageId);

  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*')
    .eq('image_id', imageId)
    .order('created_at', { ascending: false });

  if (likesError || commentsError) throw likesError || commentsError;
  return { likes, comments };
};