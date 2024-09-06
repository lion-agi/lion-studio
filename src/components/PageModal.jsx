import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PageModal = ({ page, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{page.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 flex-grow overflow-auto">
          <p className="text-sm text-gray-600">{page.content}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <strong>Date:</strong> {page.createdAt}
            </div>
            <div>
              <strong>Category:</strong> {page.collection}
            </div>
            <div>
              <strong>Word Count:</strong> {page.content.split(' ').length}
            </div>
            <div>
              <strong>Views:</strong> {page.views}
            </div>
            <div>
              <strong>Author:</strong> John Doe
            </div>
            <div>
              <strong>Last Modified:</strong> 2023-05-15
            </div>
            <div>
              <strong>Tags:</strong> AI, Machine Learning, Data Science
            </div>
            <div>
              <strong>Related Pages:</strong> Page1, Page2, Page3
            </div>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default PageModal;