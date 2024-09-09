import React, { useState } from 'react';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import useSettingsStore from '@/store/settingsSlice';

const SecuritySettings = () => {
  const { sessionTimeout, setSessionTimeout, ipWhitelist, setIpWhitelist, twoFactorAuthentication, setTwoFactorAuthentication } = useSettingsStore();

  const handleSave = () => {
    // Save settings to local storage or backend
    localStorage.setItem('sessionTimeout', sessionTimeout);
    localStorage.setItem('ipWhitelist', ipWhitelist);
    localStorage.setItem('twoFactorAuthentication', twoFactorAuthentication);
  };

  const handleReset = () => {
    // Reset settings to default values
    setSessionTimeout(30);
    setIpWhitelist([]);
    setTwoFactorAuthentication(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="sessionTimeout" className="text-lg">Session Timeout (minutes)</Label>
        <Input
          id="sessionTimeout"
          type="number"
          value={sessionTimeout}
          onChange={(e) => setSessionTimeout(e.target.value)}
          className="w-24"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="ipWhitelist" className="text-lg">IP Whitelist</Label>
        <Input
          id="ipWhitelist"
          type="text"
          value={ipWhitelist.join(', ')}
          onChange={(e) => setIpWhitelist(e.target.value.split(',').map(ip => ip.trim()))}
          placeholder="Enter IP addresses separated by commas"
          className="flex-grow"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="twoFactorAuthentication" className="text-lg">Two-Factor Authentication</Label>
        <Switch
          id="twoFactorAuthentication"
          checked={twoFactorAuthentication}
          onCheckedChange={setTwoFactorAuthentication}
        />
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
        <Button onClick={handleReset} variant="outline" className="ml-2">Reset to Default</Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
