import React from 'react';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { MessageSquare, FileText } from 'lucide-react';

const Modals = ({ selectedThread, selectedPage, handleCloseModal }) => {
  return (
    <>
      {/* Thread Modal */}
      {selectedThread && (
        <Dialog open={!!selectedThread} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedThread.title}</DialogTitle>
            </DialogHeader>
            <p>{selectedThread.content}</p>
          </DialogContent>
        </Dialog>
      )}

      {/* Page Modal */}
      {selectedPage && (
        <Dialog open={!!selectedPage} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPage.title}</DialogTitle>
            </DialogHeader>
            <p>{selectedPage.content}</p>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Modals;