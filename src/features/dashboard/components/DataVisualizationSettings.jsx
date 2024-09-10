import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import useSettingsStore from '@/store/settingsSlice';

const DataVisualizationSettings = () => {
  const {
    widgetSizes,
    setWidgetSizes,
    metricSelection,
    setMetricSelection,
    chartColorSchemes,
    setChartColorSchemes,
    dataDensity,
    setDataDensity,
  } = useSettingsStore();

  const [customColorScheme, setCustomColorScheme] = useState('');

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving visualization settings');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="widgetSizes">Widget Sizes</Label>
        <Select value={widgetSizes} onValueChange={setWidgetSizes}>
          <SelectTrigger id="widgetSizes">
            <SelectValue placeholder="Select widget size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metricSelection">Metric Selection</Label>
        <Select value={metricSelection} onValueChange={setMetricSelection}>
          <SelectTrigger id="metricSelection">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metric1">Metric 1</SelectItem>
            <SelectItem value="metric2">Metric 2</SelectItem>
            <SelectItem value="metric3">Metric 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="chartColorSchemes">Chart Color Schemes</Label>
        <Select value={chartColorSchemes} onValueChange={setChartColorSchemes}>
          <SelectTrigger id="chartColorSchemes">
            <SelectValue placeholder="Select color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="colorblind">Colorblind Friendly</SelectItem>
            <SelectItem value="pastel">Pastel</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {chartColorSchemes === 'custom' && (
        <div className="space-y-2">
          <Label htmlFor="customColorScheme">Custom Color Scheme</Label>
          <Input
            id="customColorScheme"
            value={customColorScheme}
            onChange={(e) => setCustomColorScheme(e.target.value)}
            placeholder="Enter comma-separated hex colors"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="dataDensity">Data Density</Label>
        <Select value={dataDensity} onValueChange={setDataDensity}>
          <SelectTrigger id="dataDensity">
            <SelectValue placeholder="Select data density" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSave}>Save Visualization Settings</Button>
    </div>
  );
};

export default DataVisualizationSettings;
