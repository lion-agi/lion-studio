import React, { useState } from 'react';
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Switch } from "@/common/components/ui/switch";
import { Button } from "@/common/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useSettingsStore } from '@/store/settingsSlice';

const NotificationSettings = () => {
  const { alertThresholds, setAlertThresholds, notificationMethod, setNotificationMethod, notificationFrequency, setNotificationFrequency, customAlert, setCustomAlert } = useSettingsStore();

  const handleSave = () => {
    // Save settings logic here
  };

  const handleReset = () => {
    setAlertThresholds('');
    setNotificationMethod('in-app');
    setNotificationFrequency('daily');
    setCustomAlert('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="alertThresholds" className="text-lg">Alert Thresholds</Label>
        <Input
          id="alertThresholds"
          value={alertThresholds}
          onChange={(e) => setAlertThresholds(e.target.value)}
          placeholder="Enter alert thresholds"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="notificationMethod" className="text-lg">Notification Method</Label>
        <Select
          value={notificationMethod}
          onValueChange={setNotificationMethod}
        >
          <SelectTrigger id="notificationMethod">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in-app">In-App</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="notificationFrequency" className="text-lg">Notification Frequency</Label>
        <Select
          value={notificationFrequency}
          onValueChange={setNotificationFrequency}
        >
          <SelectTrigger id="notificationFrequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="customAlert" className="text-lg">Custom Alert</Label>
        <Input
          id="customAlert"
          value={customAlert}
          onChange={(e) => setCustomAlert(e.target.value)}
          placeholder="Enter custom alert"
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
        <Button onClick={handleReset} variant="outline" className="ml-2">Reset to Default</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
