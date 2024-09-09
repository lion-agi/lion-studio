import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      tableFields: {
        timestamp: true,
        provider: true,
        model: true,
        endpoint: true,
        method: true,
        baseUrl: true,
        tokens: true,
        cost: true,
        responseTime: true,
      },
      theme: 'light',
      autoRefreshInterval: 0,

      toggleTableField: (field) => 
        set((state) => ({
          tableFields: { ...state.tableFields, [field]: !state.tableFields[field] },
        })),

      setTheme: (theme) => set({ theme }),

      setAutoRefreshInterval: (interval) => set({ autoRefreshInterval: interval }),
    }),
    {
      name: 'dashboard-settings',
    }
  )
);

export default useSettingsStore;