import React, { useState } from 'react';
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Slider } from "@/common/components/ui/slider";
import { useSettingsStore } from '@/store/settingsSlice';

const PerformanceOptimizationSettings = () => {
  const { dataSamplingRate, setDataSamplingRate, cacheDuration, setCacheDuration, lazyLoading, setLazyLoading } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="dataSamplingRate" className="text-lg">Data Sampling Rate</Label>
        <Slider
          id="dataSamplingRate"
          value={[dataSamplingRate]}
          onValueChange={(value) => setDataSamplingRate(value[0])}
          min={10}
          max={100}
          step={10}
        />
        <span>{dataSamplingRate}%</span>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="cacheDuration" className="text-lg">Cache Duration (seconds)</Label>
        <Select
          id="cacheDuration"
          value={cacheDuration.toString()}
          onValueChange={(value) => setCacheDuration(parseInt(value, 10))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 seconds</SelectItem>
            <SelectItem value="60">1 minute</SelectItem>
            <SelectItem value="300">5 minutes</SelectItem>
            <SelectItem value="600">10 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="lazyLoading" className="text-lg">Lazy Loading</Label>
        <Switch
          id="lazyLoading"
          checked={lazyLoading}
          onCheckedChange={setLazyLoading}
        />
      </div>
    </div>
  );
};

export default PerformanceOptimizationSettings;
