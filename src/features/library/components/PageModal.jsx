import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
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
  const handleEdit = () => {
    if (typeof onEdit === 'function') {
      onEdit(page);
      onClose();
    } else {
      console.warn('onEdit prop is not a function');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-[#1a1b26] text-gray-200 border-gray-700 p-0">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-bold text-white">{page.title}</DialogTitle>
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
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-300">
            <InfoItem label="Date" value={new Date(page.created_at).toLocaleDateString()} />
            <InfoItem label="Category" value={page.category} />
            <InfoItem label="Word Count" value={page.word_count} />
            <InfoItem label="Views" value={page.views} />
            <InfoItem label="Author" value={page.author} />
            <InfoItem label="Last Modified" value={new Date(page.updated_at).toLocaleDateString()} />
          </div>
          {page.tags && page.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {page.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-900 text-purple-100 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {page.related_pages && page.related_pages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Related Pages</h3>
              <ul className="list-disc list-inside text-purple-400 text-sm space-y-1">
                {page.related_pages.map((relatedPage, index) => (
                  <li key={index}>{relatedPage}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-gray-700 mt-4">
          <div className="flex justify-between">
            <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
              Edit
            </Button>
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

export default PageModal;

// Path: src/features/library/components/PageModal.jsx