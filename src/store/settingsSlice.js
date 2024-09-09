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
      dashboardLayout: [],
      widgetSizes: 'medium',
      metricSelection: 'metric1',
      chartColorSchemes: 'default',
      dataDensity: 'medium',
      alertThresholds: '',
      notificationMethod: 'in-app',
      notificationFrequency: 'daily',
      customAlert: '',
      dataSamplingRate: 1,
      cacheDuration: 60,
      lazyLoading: false,
      exportFormat: 'CSV',
      reportScheduling: 'daily',
      customReports: [],
      numberFormat: '1,000.00',
      dateFormat: 'MM/DD/YYYY',
      language: 'en',
      fontSize: 16,
      highContrastMode: false,
      screenReaderOptimization: false,
      keyboardNavigation: false,
      sqlQueryBuilder: '',
      savedViews: [],
      apiAccessKeys: [],
      sessionTimeout: 30,
      ipWhitelist: [],
      twoFactorAuthentication: false,

      toggleTableField: (field) => 
        set((state) => ({
          tableFields: { ...state.tableFields, [field]: !state.tableFields[field] },
        })),

      setTheme: (theme) => set({ theme }),

      setAutoRefreshInterval: (interval) => set({ autoRefreshInterval: interval }),

      setDashboardLayout: (layout) => set({ dashboardLayout: layout }),

      setWidgetSizes: (size) => set({ widgetSizes: size }),

      setMetricSelection: (metric) => set({ metricSelection: metric }),

      setChartColorSchemes: (scheme) => set({ chartColorSchemes: scheme }),

      setDataDensity: (density) => set({ dataDensity: density }),

      setAlertThresholds: (thresholds) => set({ alertThresholds: thresholds }),

      setNotificationMethod: (method) => set({ notificationMethod: method }),

      setNotificationFrequency: (frequency) => set({ notificationFrequency: frequency }),

      setCustomAlert: (alert) => set({ customAlert: alert }),

      setDataSamplingRate: (rate) => set({ dataSamplingRate: rate }),

      setCacheDuration: (duration) => set({ cacheDuration: duration }),

      setLazyLoading: (loading) => set({ lazyLoading: loading }),

      setExportFormat: (format) => set({ exportFormat: format }),

      setReportScheduling: (scheduling) => set({ reportScheduling: scheduling }),

      setCustomReports: (reports) => set({ customReports: reports }),

      setNumberFormat: (format) => set({ numberFormat: format }),

      setDateFormat: (format) => set({ dateFormat: format }),

      setLanguage: (language) => set({ language }),

      setFontSize: (size) => set({ fontSize: size }),

      setHighContrastMode: (mode) => set({ highContrastMode: mode }),

      setScreenReaderOptimization: (optimization) => set({ screenReaderOptimization: optimization }),

      setKeyboardNavigation: (navigation) => set({ keyboardNavigation: navigation }),

      setSqlQueryBuilder: (query) => set({ sqlQueryBuilder: query }),

      setSavedViews: (views) => set({ savedViews: views }),

      setApiAccessKeys: (keys) => set({ apiAccessKeys: keys }),

      setSessionTimeout: (timeout) => set({ sessionTimeout: timeout }),

      setIpWhitelist: (whitelist) => set({ ipWhitelist: whitelist }),

      setTwoFactorAuthentication: (enabled) => set({ twoFactorAuthentication: enabled }),

      setTableFieldsOrder: (fields) => set({ tableFields: fields }),
    }),
    {
      name: 'dashboard-settings',
    }
  )
);

export default useSettingsStore;
