import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/common/components/ui/button"
import { Input } from "@/common/components/ui/input"
import { Label } from "@/common/components/ui/label"
import { Switch } from "@/common/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Slider } from "@/common/components/ui/slider";

const backgroundColors = {
  'Dark Blue': '#1A2530',
  'Light Gray': '#F0F4F8',
  'Dark Gray': '#2C3E50',
  'Navy': '#34495E',
};

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Workflow Settings</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="workflowName">Workflow Name</Label>
            <Input id="workflowName" placeholder="Enter workflow name" />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Enter workflow description" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoSave">Auto Save</Label>
            <Switch id="autoSave" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch id="darkMode" />
          </div>
          <div>
            <Label>Background Color</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select background color" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(backgroundColors).map(([name, color]) => (
                  <SelectItem key={color} value={color}>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
                      {name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Grid Size</Label>
            <Slider min={10} max={50} step={5} />
          </div>
          <Button className="w-full">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;


// Path: src/common/components/SettingsModal.jsx