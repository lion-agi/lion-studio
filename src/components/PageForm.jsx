import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from 'lucide-react';

const PageForm = ({ page, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    tags: '',
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        content: page.content || '',
        category_id: page.category_id || '',
        tags: page.tags ? page.tags.join(', ') : '',
      });
    }
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim());
    onSave({ ...formData, tags });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-[#1a1b26] text-gray-200 border-gray-700 p-0">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            {page ? 'Edit Page' : 'Create New Page'}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-6 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 bg-navy-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300">Content</label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="mt-1 h-40 bg-navy-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-300">Category ID</label>
            <Input
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="mt-1 bg-navy-800 text-white"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma-separated)</label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 bg-navy-800 text-white"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
            <Button type="submit" variant="default">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PageForm;