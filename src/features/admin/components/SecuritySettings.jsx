import React from 'react';
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";

const SecuritySettings = ({ settings, handleSettingChange }) => (
  <div className="space-y-4 mt-8">
    <h2 className="text-2xl font-semibold">Security Settings</h2>
    {Object.entries(settings).map(([setting, value]) => (
      <div key={setting} className="flex items-center space-x-4">
        <Label htmlFor={setting}>{setting}</Label>
        <Input
          id={setting}
          value={value}
          onChange={(e) => handleSettingChange(setting, e.target.value)}
          className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      </div>
    ))}
  </div>
);

export default SecuritySettings;

// Path: src/features/admin/components/SecuritySettings.jsx