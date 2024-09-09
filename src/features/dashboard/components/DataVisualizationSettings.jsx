import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { useSettingsStore } from '@/store/settingsSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DataVisualizationSettings = () => {
  const { dashboardLayout, setDashboardLayout, widgetSizes, setWidgetSizes, metricSelection, setMetricSelection, chartColorSchemes, setChartColorSchemes, dataDensity, setDataDensity } = useSettingsStore();
  const [customColorScheme, setCustomColorScheme] = useState('');
  const [error, setError] = useState('');

  const handleCustomColorSchemeChange = (e) => {
    try {
      new Function(e.target.value);
      setError('');
    } catch (err) {
      setError('Invalid color scheme');
    }
    setCustomColorScheme(e.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedLayout = Array.from(dashboardLayout);
    const [removed] = reorderedLayout.splice(result.source.index, 1);
    reorderedLayout.splice(result.destination.index, 0, removed);
    setDashboardLayout(reorderedLayout);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboardLayout">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {dashboardLayout.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center space-x-4 mb-2"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Switch
                              id={widget.id}
                              checked={widget.isVisible}
                              onCheckedChange={() => setDashboardLayout(dashboardLayout.map(w => w.id === widget.id ? { ...w, isVisible: !w.isVisible } : w))}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Toggle {widget.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Label htmlFor={widget.id} className="capitalize text-lg">{widget.name}</Label>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex items-center space-x-4">
        <Label htmlFor="widgetSizes" className="text-lg">Widget Sizes</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Select the widget size</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="metricSelection" className="text-lg">Metric Selection</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Select the metric</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="chartColorSchemes" className="text-lg">Chart Color Schemes</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Select value={chartColorSchemes} onValueChange={setChartColorSchemes}>
                <SelectTrigger id="chartColorSchemes">
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="highContrast">High Contrast</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select the chart color scheme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="dataDensity" className="text-lg">Data Density</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Select the data density</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="customColorScheme" className="text-lg">Custom Color Scheme</Label>
        <Input
          id="customColorScheme"
          value={customColorScheme}
          onChange={handleCustomColorSchemeChange}
          placeholder="Enter custom color scheme"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default DataVisualizationSettings;