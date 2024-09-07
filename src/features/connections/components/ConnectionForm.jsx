import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { X } from 'lucide-react';

const ConnectionForm = ({ connection, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    config: {},
    is_active: true,
  });

  useEffect(() => {
    if (connection) {
      setFormData({
        name: connection.name || '',
        type: connection.type || '',
        description: connection.description || '',
        config: connection.config || {},
        is_active: connection.is_active !== undefined ? connection.is_active : true,
      });
    } else {
      setFormData({
        name: '',
        type: '',
        description: '',
        config: {},
        is_active: true,
      });
    }
  }, [connection]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-gray-800 text-gray-100 border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-2xl font-bold text-purple-300">
            {connection ? 'Edit Connection' : 'Create New Connection'}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-300">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-300">Type</Label>
            <Select name="type" value={formData.type} onValueChange={(value) => handleChange({ target: { name: 'type', value } })}>
              <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:border-purple-500">
                <SelectValue placeholder="Select connection type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="file_storage">File Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-300">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="h-20 bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active" className="text-sm font-medium text-gray-300">Active</Label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" onClick={onClose} variant="secondary" className="bg-gray-700 text-white hover:bg-gray-600">Cancel</Button>
            <Button type="submit" variant="default" className="bg-purple-600 text-white hover:bg-purple-700">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectionForm;