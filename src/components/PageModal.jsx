import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import Markdown from 'react-markdown';

const PageModal = ({ page, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-[#1a1b26] text-gray-200 border-gray-700 p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold text-white">{page.title}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="px-6 py-4 space-y-4">
          <div className="prose prose-invert max-w-none">
            <Markdown>{page.content}</Markdown>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
            <InfoItem label="Date" value={page.createdAt} />
            <InfoItem label="Category" value={page.collection} />
            <InfoItem label="Word Count" value={page.content.split(' ').length} />
            <InfoItem label="Views" value={page.views} />
            <InfoItem label="Author" value="John Doe" />
            <InfoItem label="Last Modified" value="2023-05-15" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['AI', 'Machine Learning', 'Data Science'].map((tag) => (
                <span key={tag} className="px-2 py-1 bg-purple-900 text-purple-100 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">Related Pages</h3>
            <ul className="list-disc list-inside text-purple-400 text-sm">
              {['Page1', 'Page2', 'Page3'].map((relatedPage) => (
                <li key={relatedPage}>{relatedPage}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-700 mt-4">
          <Button onClick={onClose} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <span className="text-gray-300">{label}:</span> {value}
  </div>
);

export default PageModal;