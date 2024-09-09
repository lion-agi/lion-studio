import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/common/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Info } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import useSettingsStore from '@/store/settingsSlice';

const TableCustomization = () => {
  const { tableFields, toggleTableField } = useSettingsStore();

  return (
    <div className="space-y-2">
      {Object.entries(tableFields).map(([field, isVisible]) => (
        <div key={field} className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch 
                  id={field} 
                  checked={isVisible}
                  onCheckedChange={() => toggleTableField(field)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {field}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Label htmlFor={field} className="capitalize">{field}</Label>
        </div>
      ))}
    </div>
  );
};

const DisplayPreferences = () => {
  const { theme, setTheme, autoRefreshInterval, setAutoRefreshInterval } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="theme">Theme</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Select value={theme} onValueChange={setTheme}>
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
      <div className="flex items-center space-x-2">
        <Label htmlFor="autoRefresh">Auto Refresh Interval (seconds)</Label>
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
    </div>
  );
};

const GeneralSettings = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="notifications">Enable Notifications</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Switch id="notifications" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="language">Language</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Select>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select the language</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

const SettingsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const settingsSections = [
    { title: "Table Customization", component: <TableCustomization /> },
    { title: "Display Preferences", component: <DisplayPreferences /> },
    { title: "General Settings", component: <GeneralSettings /> },
  ];

  const filterSettings = (settings) => {
    return settings.filter(setting => 
      setting.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <Input 
          type="text"
          placeholder="Search settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filterSettings(settingsSections).map((section, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>{section.component}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
        <Button variant="outline" className="ml-2">Reset to Default</Button>
      </div>
    </div>
  );
};

export default SettingsTab;