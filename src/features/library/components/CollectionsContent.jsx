import React from 'react';
import { Button } from "@/common/components/ui/button";
import { PlusCircle, FolderPlus } from 'lucide-react';
import CollectionItem from './CollectionItem';
import EmptyState from './EmptyState';

const CollectionsContent = ({ collections, handleOpenPageModal, handleDeletePage, handleEditPage, setIsCreateCollectionOpen }) => (
  <div className="mt-6">
    {collections && collections.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            onOpenModal={handleOpenPageModal}
            onDelete={handleDeletePage}
            onEdit={handleEditPage}
          />
        ))}
        <Button
          onClick={() => setIsCreateCollectionOpen(true)}
          className="h-full min-h-[200px] flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-200 border-2 border-dashed border-gray-600 hover:border-purple-500 transition-all duration-300 rounded-lg"
        >
          <PlusCircle className="h-8 w-8 mb-2" />
          <span>Create New Collection</span>
        </Button>
      </div>
    ) : (
      <EmptyState 
        message="No collections found. Create your first collection!" 
        icon={FolderPlus}
        action={
          <Button onClick={() => setIsCreateCollectionOpen(true)} className="mt-4">
            Create New Collection
          </Button>
        }
      />
    )}
  </div>
);

export default CollectionsContent;

// Path: src/features/library/components/CollectionsContent.jsx