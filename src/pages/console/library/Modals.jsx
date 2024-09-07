import React from 'react';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { MessageSquare, FileText, FolderPlus } from 'lucide-react';
import CreateCollectionForm from '../../../common/components/CreateCollectionForm';

const Modals = ({ selectedThread, selectedPage, selectedDataSource, handleCloseModal, isCreateCollectionOpen, setIsCreateCollectionOpen }) => {
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

      {/* Data Source Modal */}
      {selectedDataSource && (
        <Dialog open={!!selectedDataSource} onOpenChange={handleCloseModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedDataSource.name}</DialogTitle>
            </DialogHeader>
            <p>{selectedDataSource.description}</p>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Collection Modal */}
      <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
          </DialogHeader>
          <CreateCollectionForm onClose={() => setIsCreateCollectionOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modals;