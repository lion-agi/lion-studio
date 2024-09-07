import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Checkbox } from "@/common/components/ui/checkbox";

const CreatePageModal = ({ isOpen, onClose, threads, selectedThreads, toggleThreadSelection, onCreatePage }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePage({ title });
    setTitle('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label>Select Threads</Label>
            <div className="max-h-60 overflow-y-auto">
              {threads.map(thread => (
                <div key={thread.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id={`thread-${thread.id}`} 
                    checked={selectedThreads.some(t => t.id === thread.id)}
                    onCheckedChange={() => toggleThreadSelection(thread)}
                  />
                  <Label htmlFor={`thread-${thread.id}`} className="text-sm">
                    {thread.title}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Create Page</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageModal;