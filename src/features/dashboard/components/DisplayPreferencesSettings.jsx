import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { useSettingsStore } from '@/store/settingsSlice';
import { ThemeProvider } from "@/common/components/theme-provider";
import { useSettings } from './SettingsContext';

const DisplayPreferencesSettings = () => {
  const { theme, setTheme, autoRefreshInterval, setAutoRefreshInterval } = useSettingsStore();
  const [chartType, setChartType] = useState('bar');
  const [colorScheme, setColorScheme] = useState('default');
  const [defaultView, setDefaultView] = useState('tab1');
  const [timezone, setTimezone] = useState('UTC');
  const { settings, setSettings } = useSettings();

  const handleThemeChange = (value) => {
    setTheme(value);
    setSettings({ ...settings, theme: value });
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
    setSettings({ ...settings, chartType: value });
  };

  const handleColorSchemeChange = (value) => {
    setColorScheme(value);
    setSettings({ ...settings, colorScheme: value });
  };

  return (
    <ThemeProvider>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label htmlFor="theme" className="text-lg">Theme</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="colorScheme" className="text-lg">Color Scheme</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={colorScheme} onValueChange={handleColorSchemeChange}>
                  <SelectTrigger id="colorScheme">
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="highContrast">High Contrast</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the color scheme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="chartType" className="text-lg">Chart Type</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={chartType} onValueChange={handleChartTypeChange}>
                  <SelectTrigger id="chartType">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="pie">Pie</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the chart type</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="defaultView" className="text-lg">Default View</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger id="defaultView">
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tab1">Tab 1</SelectItem>
                    <SelectItem value="tab2">Tab 2</SelectItem>
                    <SelectItem value="tab3">Tab 3</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the default view</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="autoRefresh" className="text-lg">Auto Refresh Interval (seconds)</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select 
                  value={autoRefreshInterval.toString()} 
                  onValueChange={(value) => setAutoRefreshInterval(parseInt(value, 10))}
                >
                  <SelectTrigger id="autoRefresh">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Disabled</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the auto-refresh interval</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="timezone" className="text-lg">Timezone</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                  </SelectContent>
                </Select>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the timezone</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DisplayPreferencesSettings;
