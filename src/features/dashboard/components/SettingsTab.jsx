import React, { useState } from 'react';
import { useSettingsStore } from '@/store/settingsSlice';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";
import { Eye, Settings, Palette, Globe } from 'lucide-react';

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
  } = useSettingsStore();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSettings = [
    { id: 'table-customization', title: 'Table Customization', icon: <Eye className="h-5 w-5" />, component: TableCustomization },
    { id: 'display-preferences', title: 'Display Preferences', icon: <Palette className="h-5 w-5" />, component: DisplayPreferences },
    { id: 'general-settings', title: 'General Settings', icon: <Settings className="h-5 w-5" />, component: GeneralSettings },
  ].filter(setting => 
    setting.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Settings</h2>
        <Input
          type="text"
          placeholder="Search settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 bg-gray-800 text-gray-100 border-gray-700"
        />
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {filteredSettings.map(({ id, title, icon, component: Component }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="text-xl font-semibold">
              <div className="flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-6">
                  <Component />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="flex justify-end space-x-4 mt-6">
        <Button variant="outline" onClick={() => useSettingsStore.getState().resetToDefault()}>
          Reset to Default
        </Button>
        <Button onClick={() => console.log('Settings saved')}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

const TableCustomization = () => {
  const { tableFields, toggleTableField } = useSettingsStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Visible</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(tableFields).map(([field, isVisible]) => (
          <TableRow key={field}>
            <TableCell className="font-medium">{field}</TableCell>
            <TableCell>
              <Switch
                checked={isVisible}
                onCheckedChange={() => toggleTableField(field)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const DisplayPreferences = () => {
  const { theme, setTheme, autoRefreshInterval, setAutoRefreshInterval, chartType, setChartType, colorScheme, setColorScheme } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="theme">Theme</Label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger id="theme" className="w-[180px]">
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
          <SelectTrigger id="chartType" className="w-[180px]">
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
          <SelectTrigger id="colorScheme" className="w-[180px]">
            <SelectValue placeholder="Select color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="colorblind">Colorblind Friendly</SelectItem>
            <SelectItem value="pastel">Pastel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  const { language, setLanguage, enableNotifications, setEnableNotifications } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="language">Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id="language" className="w-[180px]">
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
  );
};

export default SettingsTab;