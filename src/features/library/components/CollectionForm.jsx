import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Label } from "@/common/components/ui/label";
import commonStyles from '@/common/components/ui/style-guide';

const CollectionForm = ({ collection, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    metadata: {},
  });

  useEffect(() => {
    if (collection) {
      setFormData({
        title: collection.title || '',
        description: collection.description || '',
        metadata: collection.metadata || {},
      });
    } else {
      setFormData({
        title: '',
        description: '',
        metadata: {},
      });
    }
  }, [collection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMetadataChange = (e) => {
    try {
      const metadata = JSON.parse(e.target.value);
      setFormData(prev => ({
        ...prev,
        metadata
      }));
    } catch (error) {
      console.error('Invalid JSON for metadata');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 text-gray-100" style={commonStyles}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {collection ? 'Edit Collection' : 'Create New Collection'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON)</Label>
            <Textarea
              id="metadata"
              name="metadata"
              value={JSON.stringify(formData.metadata, null, 2)}
              onChange={handleMetadataChange}
              className="bg-gray-700 text-white border-gray-600 focus:border-purple-500"
              rows={5}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
            <Button type="submit" variant="default">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionForm;
