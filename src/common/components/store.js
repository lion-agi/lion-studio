import { create } from 'zustand';

export const useStore = create((set) => ({
  session: null,
  loading: true,
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
}));