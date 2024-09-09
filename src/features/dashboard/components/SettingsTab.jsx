import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/button";

const SettingsTab = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (setting) => {
    setLocalSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showCostTrend">Show Cost Trend Chart</Label>
            <Switch
              id="showCostTrend"
              checked={localSettings.showCostTrend}
              onCheckedChange={() => handleToggle('showCostTrend')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showCostBreakdown">Show Cost Breakdown Chart</Label>
            <Switch
              id="showCostBreakdown"
              checked={localSettings.showCostBreakdown}
              onCheckedChange={() => handleToggle('showCostBreakdown')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showPerformanceMetrics">Show Performance Metrics</Label>
            <Switch
              id="showPerformanceMetrics"
              checked={localSettings.showPerformanceMetrics}
              onCheckedChange={() => handleToggle('showPerformanceMetrics')}
            />
          </div>
          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;