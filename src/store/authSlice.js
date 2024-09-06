import { supabase } from '@/integrations/supabase/supabase';

export const createAuthSlice = (set) => ({
  session: null,
  user: null,
  loading: true,
  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ session: data.session, user: data.user });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
  register: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData },
    });
    if (error) throw error;
    set({ session: data.session, user: data.user });
  },
});