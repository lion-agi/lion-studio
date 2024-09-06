import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/common/components/ui/button"
import { Input } from "@/common/components/ui/input"
import { Label } from "@/common/components/ui/label"
import { Switch } from "@/common/components/ui/switch"

const SettingsModal = ({ onClose }) => {
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
          <Button className="w-full">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;