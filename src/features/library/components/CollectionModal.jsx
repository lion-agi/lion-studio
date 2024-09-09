import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";

const CollectionModal = ({ collection, isOpen, onClose }) => {
  if (!collection) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            {collection.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <p className="text-gray-300">{collection.description}</p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Created: {new Date(collection.created_at).toLocaleString()}</Badge>
            <Badge variant="outline">Updated: {new Date(collection.updated_at).toLocaleString()}</Badge>
          </div>
          {collection.metadata && (
            <div>
              <h4 className="text-lg font-semibold mb-2">Metadata:</h4>
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(collection.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionModal;

// Path: src/features/library/components/CollectionModal.jsx