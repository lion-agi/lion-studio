import React from 'react';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { MessageSquare, FileText, FolderPlus } from 'lucide-react';
import CreateCollectionForm from '../../common/components/CreateCollectionForm';

const ActionButtons = ({ setIsCreateCollectionOpen }) => (
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
    <Button variant="secondary" className="text-gray-200 bg-gray-800 hover:bg-gray-700 flex items-center">
      <MessageSquare className="h-4 w-4 mr-2" />
      Thread
    </Button>
    <Button variant="secondary" className="text-gray-200 bg-gray-800 hover:bg-gray-700 flex items-center">
      <FileText className="h-4 w-4 mr-2" />
      Page
    </Button>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="text-gray-200 bg-gray-800 hover:bg-gray-700 flex items-center">
          <FolderPlus className="h-4 w-4 mr-2" />
          Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-200">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
        </DialogHeader>
        <CreateCollectionForm onClose={() => setIsCreateCollectionOpen(false)} />
      </DialogContent>
    </Dialog>
  </div>
);

export default ActionButtons;