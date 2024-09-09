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
      displayPreferences: {
        overview: ['summaryCards', 'costTrendChart', 'performanceChart'],
        costs: ['summaryCards', 'costTrendChart', 'costBreakdownChart'],
        calls: ['summaryCards', 'recentCallsTable'],
      },
      theme: 'light',
      autoRefreshInterval: 0, // 0 means disabled

      toggleTableField: (field) => 
        set((state) => ({
          tableFields: { ...state.tableFields, [field]: !state.tableFields[field] },
        })),

      updateDisplayPreference: (tab, components) =>
        set((state) => ({
          displayPreferences: { ...state.displayPreferences, [tab]: components },
        })),

      setTheme: (theme) => set({ theme }),

      setAutoRefreshInterval: (interval) => set({ autoRefreshInterval: interval }),
    }),
    {
      name: 'settings-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useSettingsStore;