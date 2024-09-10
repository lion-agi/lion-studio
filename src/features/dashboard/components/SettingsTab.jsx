import React from 'react';
import { useSettingsStore } from '@/store/settingsSlice';
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";

const SettingsTab = () => {
  const {
    tableFields,
    toggleTableField,
    theme,
    setTheme,
    autoRefreshInterval,
    setAutoRefreshInterval,
    chartType,
    setChartType,
    colorScheme,
    setColorScheme,
    language,
    setLanguage,
    enableNotifications,
    setEnableNotifications,
    resetToDefault,
  } = useSettingsStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Settings</h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Table Fields</h3>
        {Object.entries(tableFields).map(([field, isVisible]) => (
          <div key={field} className="flex items-center justify-between py-2">
            <Label htmlFor={field}>{field}</Label>
            <Switch
              id={field}
              checked={isVisible}
              onCheckedChange={() => toggleTableField(field)}
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">General Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoRefresh">Auto Refresh Interval (seconds)</Label>
            <Input
              id="autoRefresh"
              type="number"
              value={autoRefreshInterval}
              onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
              className="w-[180px]"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="chartType">Chart Type</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="pie">Pie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="colorScheme">Color Scheme</Label>
            <Select value={colorScheme} onValueChange={setColorScheme}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="colorblind">Colorblind Friendly</SelectItem>
                <SelectItem value="pastel">Pastel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable Notifications</Label>
            <Switch
              id="notifications"
              checked={enableNotifications}
              onCheckedChange={setEnableNotifications}
            />
          </div>
        </div>
      </div>

      <Button onClick={resetToDefault} variant="outline">
        Reset to Default Settings
      </Button>
    </div>
  );
};

export default SettingsTab;
