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
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedThread.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {selectedThread.summary && (
                <p className="text-sm text-gray-600 mb-4">{selectedThread.summary}</p>
              )}
              <p className="whitespace-pre-wrap">{selectedThread.content}</p>
              {selectedThread.topic && (
                <p className="mt-4 text-sm text-gray-600">Topic: {selectedThread.topic}</p>
              )}
              <p className="mt-2 text-sm text-gray-600">
                Created: {new Date(selectedThread.created_at).toLocaleString()}
              </p>
              {selectedThread.updated_at && (
                <p className="mt-1 text-sm text-gray-600">
                  Updated: {new Date(selectedThread.updated_at).toLocaleString()}
                </p>
              )}
              {selectedThread.metadata && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold">Metadata:</h4>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
                    {JSON.stringify(selectedThread.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
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
