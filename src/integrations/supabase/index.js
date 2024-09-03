// Import all the relevant exports from other files in the supabase directory
import { supabase } from './supabase.js';
import { SupabaseAuthProvider, useSupabaseAuth, SupabaseAuthUI } from './auth.jsx';
import {
  useUsers,
  useUser,
  useAddUser,
  useUpdateUser,
  useDeleteUser
} from './hooks/users.js';

// Export all the imported functions and objects
export {
  supabase,
  SupabaseAuthProvider,
  useSupabaseAuth,
  SupabaseAuthUI,
  useUsers,
  useUser,
  useAddUser,
  useUpdateUser,
  useDeleteUser
};