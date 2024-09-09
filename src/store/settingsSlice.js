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
      theme: 'dark',
      autoRefreshInterval: 30,
      chartType: 'bar',
      colorScheme: 'default',
      language: 'en',
      enableNotifications: true,

      toggleTableField: (field) => 
        set((state) => ({
          tableFields: { ...state.tableFields, [field]: !state.tableFields[field] },
        })),

      setTheme: (theme) => set({ theme }),
      setAutoRefreshInterval: (interval) => set({ autoRefreshInterval: interval }),
      setChartType: (type) => set({ chartType: type }),
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
      setLanguage: (lang) => set({ language: lang }),
      setEnableNotifications: (enable) => set({ enableNotifications: enable }),

      resetToDefault: () => set({
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
        theme: 'dark',
        autoRefreshInterval: 30,
        chartType: 'bar',
        colorScheme: 'default',
        language: 'en',
        enableNotifications: true,
      }),
    }),
    {
      name: 'settings-storage',
      getStorage: () => localStorage,
    }
  )
);

export { useSettingsStore };
export default useSettingsStore;