import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Switch } from "@/common/components/ui/switch";
import { X } from 'lucide-react';

const PageForm = ({ page, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    topic: '',
    summary: '',
    is_active: true,
    metadata: {},
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        content: page.content || '',
        topic: page.topic || '',
        summary: page.summary || '',
        is_active: page.is_active !== undefined ? page.is_active : true,
        metadata: page.metadata || {},
      });
    } else {
      setFormData({
        title: '',
        content: '',
        topic: '',
        summary: '',
        is_active: true,
        metadata: {},
      });
    }
  }, [page]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMetadataChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value
      }
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
            {page ? 'Edit Page' : 'Create New Page'}
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
            <Label htmlFor="title" className="text-sm font-medium text-gray-300">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-300">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="h-40 bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-sm font-medium text-gray-300">Topic</Label>
            <Input
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-sm font-medium text-gray-300">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
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
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-300">Metadata</Label>
            {/* Add inputs for metadata fields here */}
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

export default PageForm;