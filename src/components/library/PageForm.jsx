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
    category: '',
    tags: '',
  });

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        content: page.content || '',
        category: page.category || '',
        tags: page.tags ? page.tags.join(', ') : '',
      });
    } else {
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
      });
    }
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    onSave({ ...formData, tags });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-[#1a1b26] text-gray-200 border-gray-700 p-0">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-white">
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 bg-navy-800 text-white border-gray-600"
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
              className="mt-1 h-40 bg-navy-800 text-white border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 bg-navy-800 text-white border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags (comma-separated)</label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 bg-navy-800 text-white border-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" onClick={onClose} variant="secondary" className="bg-gray-600 text-white hover:bg-gray-700">Cancel</Button>
            <Button type="submit" variant="default" className="bg-blue-600 text-white hover:bg-blue-700">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PageForm;