import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const ConnectionForm = ({ connection, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (connection) {
      setFormData({
        name: connection.name || '',
        type: connection.type || '',
        host: connection.host || '',
        port: connection.port || '',
        database: connection.database || '',
        username: connection.username || '',
        password: connection.password || '',
      });
    } else {
      setFormData({
        name: '',
        type: '',
        host: '',
        port: '',
        database: '',
        username: '',
        password: '',
      });
    }
  }, [connection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-300">
            {connection ? 'Edit Connection' : 'Create New Connection'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
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
            <Label htmlFor="type">Type</Label>
            <Select name="type" value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="bg-gray-700 text-white border-gray-600 focus:border-purple-500">
                <SelectValue placeholder="Select connection type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="postgres">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="database">Database</Label>
            <Input
              id="database"
              name="database"
              value={formData.database}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
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