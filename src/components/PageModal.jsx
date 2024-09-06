import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const PageModal = ({ page, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[90vh] flex flex-col bg-navy-900 text-gray-200 border-gray-700">
        <DialogHeader className="border-b border-gray-700 pb-4">
          <DialogTitle className="text-xl font-bold">{page.title}</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="p-6 space-y-6">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{page.content}</ReactMarkdown>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <InfoItem label="Date" value={page.createdAt} />
              <InfoItem label="Category" value={page.collection} />
              <InfoItem label="Word Count" value={page.content.split(' ').length} />
              <InfoItem label="Views" value={page.views} />
              <InfoItem label="Author" value="John Doe" />
              <InfoItem label="Last Modified" value="2023-05-15" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Machine Learning', 'Data Science'].map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-purple-900 text-purple-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Related Pages</h3>
              <ul className="list-disc list-inside text-purple-400">
                {['Page1', 'Page2', 'Page3'].map((relatedPage) => (
                  <li key={relatedPage}>{relatedPage}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t border-gray-700 pt-4 mt-4">
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
    <span className="font-medium text-gray-300">{label}:</span> {value}
  </div>
);

export default PageModal;