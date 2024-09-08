import { supabase } from '@/integrations/supabase/supabase';

export const createIntegrationsSlice = (set, get) => ({
  integrations: [],
  activeIntegrations: {},
  setIntegrations: (integrations) => set({ integrations }),
  setActiveIntegration: (id, isActive) => set((state) => ({
    activeIntegrations: { ...state.activeIntegrations, [id]: isActive }
  })),
  fetchIntegrations: async () => {
    const { data, error } = await supabase.from('integrations').select('*');
    if (error) throw error;
    set({ integrations: data });
  },
  toggleIntegrationStatus: (id) => set((state) => ({
    activeIntegrations: { 
      ...state.activeIntegrations, 
      [id]: !state.activeIntegrations[id] 
    }
  })),
});