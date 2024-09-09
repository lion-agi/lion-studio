import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Checkbox } from "@/common/components/ui/checkbox";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import useSettingsStore from '@/store/settingsSlice';

const TableCustomization = () => {
  const { tableFields, toggleTableField } = useSettingsStore();

  return (
    <div className="space-y-2">
      {Object.entries(tableFields).map(([field, isVisible]) => (
        <div key={field} className="flex items-center space-x-2">
          <Checkbox 
            id={field} 
            checked={isVisible}
            onCheckedChange={() => toggleTableField(field)}
          />
          <Label htmlFor={field}>{field}</Label>
        </div>
      ))}
    </div>
  );
};

const SettingsTab = () => {
  const { theme, setTheme, autoRefreshInterval, setAutoRefreshInterval } = useSettingsStore();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Table Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <TableCustomization />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Display Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="theme">Theme</Label>
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
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="autoRefresh">Auto Refresh Interval (seconds)</Label>
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
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Component Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Component library options will go here.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>General settings options will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;