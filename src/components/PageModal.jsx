import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const defaultPage = {
  title: "No Page Selected",
  content: "No content available.",
  created_at: "",
  category: "",
  word_count: 0,
  views: 0,
  author: "",
  updated_at: "",
  tags: [],
  related_pages: []
};

const PageModal = ({ page = defaultPage, isOpen, onClose, onEdit }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-[#1a1b26] text-gray-200 border-gray-700 p-0">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="text-2xl font-bold text-white">{page.title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-6 top-6 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>
        <div className="px-8 py-6 space-y-6">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-base text-gray-300">
            <InfoItem label="Date" value={page.created_at} />
            <InfoItem label="Category" value={page.category} />
            <InfoItem label="Word Count" value={page.word_count} />
            <InfoItem label="Views" value={page.views} />
            <InfoItem label="Author" value={page.author} />
            <InfoItem label="Last Modified" value={page.updated_at} />
          </div>
          {page.tags && page.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {page.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-900 text-purple-100 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {page.related_pages && page.related_pages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Related Pages</h3>
              <ul className="list-disc list-inside text-purple-400 text-base space-y-1">
                {page.related_pages.map((relatedPage, index) => (
                  <li key={index}>{relatedPage}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="px-8 py-6 border-t border-gray-700 mt-6">
          <div className="flex justify-between">
            <Button onClick={() => onEdit(page)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Edit
            </Button>
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700 text-white">
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

export default PageModal;