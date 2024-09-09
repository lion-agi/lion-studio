import React, { useState } from 'react';
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const UserPreferencesSettings = () => {
  const [numberFormat, setNumberFormat] = useState('default');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [language, setLanguage] = useState('en');

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="numberFormat" className="text-lg">Number Format</Label>
        <Select value={numberFormat} onValueChange={setNumberFormat}>
          <SelectTrigger id="numberFormat">
            <SelectValue placeholder="Select number format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="decimal">Decimal</SelectItem>
            <SelectItem value="scientific">Scientific</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="dateFormat" className="text-lg">Date Format</Label>
        <Select value={dateFormat} onValueChange={setDateFormat}>
          <SelectTrigger id="dateFormat">
            <SelectValue placeholder="Select date format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
            <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="language" className="text-lg">Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserPreferencesSettings;
