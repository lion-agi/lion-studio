import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    fetch: async (url, options) => {
      console.log('Request:', { url, options });
      const response = await fetch(url, options);
      console.log('Response:', response);
      return response;
    }
  }
});

// Function to get user profile
export const getUserProfile = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.error('Error fetching user:', authError);
    throw authError;
  }
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
  return data;
};

// Function to update user profile
export const updateUserProfile = async (userId, updates) => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
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

  if (error) {
    console.error('Error searching images:', error);
    throw error;
  }
  return { data, count };
};

// Function to like an image
export const likeImage = async (imageId) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.error('Error fetching user:', authError);
    throw authError;
  }
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('likes')
    .insert({ image_id: imageId, user_id: user.id });
  if (error) {
    console.error('Error liking image:', error);
    throw error;
  }
  return data;
};

// Function to comment on an image
export const commentOnImage = async (imageId, comment) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.error('Error fetching user:', authError);
    throw authError;
  }
  if (!user) throw new Error('No user logged in');

  const { data, error } = await supabase
    .from('comments')
    .insert({ image_id: imageId, user_id: user.id, content: comment });
  if (error) {
    console.error('Error commenting on image:', error);
    throw error;
  }
  return data;
};

// Function to get image likes and comments
export const getImageInteractions = async (imageId) => {
  const { data: likes, error: likesError } = await supabase
    .from('likes')
    .select('user_id')
    .eq('image_id', imageId);

  if (likesError) {
    console.error('Error fetching likes:', likesError);
    throw likesError;
  }

  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*')
    .eq('image_id', imageId)
    .order('created_at', { ascending: false });

  if (commentsError) {
    console.error('Error fetching comments:', commentsError);
    throw commentsError;
  }

  return { likes, comments };
};
