import { supabase } from '@/integrations/supabase/supabase';

export const createLibrarySlice = (set, get) => ({
  threads: [],
  pages: [],
  collections: [],
  dataSources: [],
  searchTerm: '',
  selectedItem: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  fetchThreads: async () => {
    const { data, error } = await supabase.from('threads').select('*');
    if (error) throw error;
    set({ threads: data });
  },
  fetchPages: async () => {
    const { data, error } = await supabase.from('pages').select('*');
    if (error) throw error;
    set({ pages: data });
  },
  fetchCollections: async () => {
    const { data, error } = await supabase.from('collections').select('*');
    if (error) throw error;
    set({ collections: data });
  },
  fetchDataSources: async () => {
    const { data, error } = await supabase.from('data_sources').select('*');
    if (error) throw error;
    set({ dataSources: data });
  },
  addPage: async (page) => {
    const { data, error } = await supabase.from('pages').insert([page]);
    if (error) throw error;
    set((state) => ({ pages: [...state.pages, data[0]] }));
  },
  updatePage: async (id, updates) => {
    const { data, error } = await supabase.from('pages').update(updates).eq('id', id);
    if (error) throw error;
    set((state) => ({
      pages: state.pages.map((page) => (page.id === id ? { ...page, ...updates } : page)),
    }));
  },
  deletePage: async (id) => {
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) throw error;
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
    }));
  },
});