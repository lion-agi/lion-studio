import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const ConfigureIntegrationModal = ({ isOpen, onClose, integration, onSave }) => {
  const [formData, setFormData] = useState(integration || {});

  useEffect(() => {
    setFormData(integration || {});
  }, [integration]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl">Configure Integration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select name="type" value={formData.type || ''} onValueChange={(value) => handleInputChange({ target: { name: 'type', value } })}>
              <SelectTrigger className="col-span-3 bg-gray-700 text-gray-100">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="cloud">Cloud Storage</SelectItem>
                <SelectItem value="ai">AI Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="col-span-3 bg-gray-700 text-gray-100"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="config" className="text-right">Configuration</Label>
            <Textarea
              id="config"
              name="config"
              value={JSON.stringify(formData.config || {}, null, 2)}
              onChange={(e) => handleInputChange({ target: { name: 'config', value: JSON.parse(e.target.value) } })}
              className="col-span-3 bg-gray-700 text-gray-100"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureIntegrationModal;

// Path: src/common/components/ConfigureIntegrationModal.jsx
