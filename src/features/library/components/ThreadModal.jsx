import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";

const ThreadModal = ({ thread, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-[#1a1b26] text-gray-200 border-gray-700 p-0">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-white">{thread.title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="px-6 py-4 space-y-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{thread.content}</ReactMarkdown>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-300">
            <InfoItem label="Date" value={new Date(thread.createdAt).toLocaleDateString()} />
            <InfoItem label="Category" value={thread.collection} />
            <InfoItem label="Word Count" value={thread.content.split(' ').length} />
            <InfoItem label="Views" value={thread.views} />
            <InfoItem label="Author" value={thread.author} />
            <InfoItem label="Comments" value={thread.comments.length} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-700 mt-4">
          <div className="flex justify-between">
            <Button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <span className="font-semibold text-gray-200">{label}:</span> {value}
  </div>
);

export default ThreadModal;
