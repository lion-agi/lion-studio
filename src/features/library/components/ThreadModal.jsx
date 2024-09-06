import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";

const ThreadModal = ({ thread, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{thread.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-gray-600">{thread.content}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Date: {thread.createdAt}</span>
            <span>Category: {thread.collection}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Word Count: {thread.content.split(' ').length}</span>
            <span>Views: {thread.views}</span>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadModal;