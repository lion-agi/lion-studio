import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsSlice';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const { settings, setSettings, resetToDefault } = useSettingsStore();

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const value = {
    settings,
    setSettings,
    resetToDefault,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
