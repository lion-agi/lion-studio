import React, { useState } from 'react';
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import useSettingsStore from '@/store/settingsSlice';

const AdvancedFeaturesSettings = () => {
  const { sqlQueryBuilder, setSqlQueryBuilder, savedViews, setSavedViews, apiAccessKeys, setApiAccessKeys } = useSettingsStore();
  const [sqlQuery, setSqlQuery] = useState(sqlQueryBuilder);
  const [apiKey, setApiKey] = useState('');

  const handleSaveView = () => {
    setSavedViews([...savedViews, sqlQuery]);
    setSqlQuery('');
  };

  const handleGenerateApiKey = () => {
    const newApiKey = 'API_KEY_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setApiAccessKeys([...apiAccessKeys, newApiKey]);
    setApiKey(newApiKey);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="sqlQuery" className="text-lg">SQL Query Builder</Label>
        <Input
          id="sqlQuery"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          placeholder="Enter SQL query"
        />
        <Button onClick={handleSaveView}>Save View</Button>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="savedViews" className="text-lg">Saved Views</Label>
        <Select>
          <SelectTrigger id="savedViews">
            <SelectValue placeholder="Select saved view" />
          </SelectTrigger>
          <SelectContent>
            {savedViews.map((view, index) => (
              <SelectItem key={index} value={view}>
                {view}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="apiKey" className="text-lg">API Access</Label>
        <Input
          id="apiKey"
          value={apiKey}
          readOnly
          placeholder="Generated API key will appear here"
        />
        <Button onClick={handleGenerateApiKey}>Generate API Key</Button>
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  );
};

export default AdvancedFeaturesSettings;
