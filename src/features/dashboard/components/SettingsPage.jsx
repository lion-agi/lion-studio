import React, { useState, useEffect } from 'react';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Search } from 'lucide-react';
import { useSettingsStore } from '@/store/settingsSlice';

const SettingsPage = () => {
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

  const [searchTerm, setSearchTerm] = useState('');

  const settingsSections = [
    {
      title: 'Display',
      settings: [
        { key: 'theme', label: 'Theme', type: 'select', options: ['light', 'dark', 'system'] },
        { key: 'chartType', label: 'Chart Type', type: 'select', options: ['bar', 'line', 'pie'] },
        { key: 'colorScheme', label: 'Color Scheme', type: 'select', options: ['default', 'colorblind', 'pastel'] },
      ]
    },
    {
      title: 'Data',
      settings: [
        { key: 'autoRefreshInterval', label: 'Auto Refresh Interval (seconds)', type: 'number' },
        ...Object.keys(tableFields).map(field => ({
          key: field,
          label: `Show ${field.charAt(0).toUpperCase() + field.slice(1)}`,
          type: 'switch'
        }))
      ]
    },
    {
      title: 'General',
      settings: [
        { key: 'language', label: 'Language', type: 'select', options: ['en', 'es', 'fr', 'de', 'ja'] },
        { key: 'enableNotifications', label: 'Enable Notifications', type: 'switch' },
      ]
    }
  ];

  const filteredSections = settingsSections.map(section => ({
    ...section,
    settings: section.settings.filter(setting => 
      setting.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.settings.length > 0);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Settings</CardTitle>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search settings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredSections.map((section, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {section.settings.map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <Label htmlFor={setting.key} className="flex-grow">{setting.label}</Label>
                        {setting.type === 'select' && (
                          <Select
                            value={eval(setting.key)}
                            onValueChange={(value) => eval(`set${setting.key.charAt(0).toUpperCase() + setting.key.slice(1)}`)(value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={`Select ${setting.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {setting.options.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {setting.type === 'switch' && (
                          <Switch
                            id={setting.key}
                            checked={setting.key.includes('tableFields') ? tableFields[setting.key.split('.')[1]] : eval(setting.key)}
                            onCheckedChange={(checked) => setting.key.includes('tableFields') ? toggleTableField(setting.key.split('.')[1]) : eval(`set${setting.key.charAt(0).toUpperCase() + setting.key.slice(1)}`)(checked)}
                          />
                        )}
                        {setting.type === 'number' && (
                          <Input
                            type="number"
                            id={setting.key}
                            value={eval(setting.key)}
                            onChange={(e) => eval(`set${setting.key.charAt(0).toUpperCase() + setting.key.slice(1)}`)(Number(e.target.value))}
                            className="w-[180px]"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 flex justify-end">
            <Button onClick={resetToDefault} variant="outline">Reset to Default</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;