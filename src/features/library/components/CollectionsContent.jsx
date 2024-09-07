import React from 'react';
import { Button } from "@/common/components/ui/button";
import { PlusCircle, FolderPlus } from 'lucide-react';
import CollectionItem from '../../features/library/components/CollectionItem';
import EmptyState from '../../features/library/components/EmptyState';

const CollectionsContent = ({ collections, handleOpenPageModal, handleDeletePage, handleEditPage, setIsCreateCollectionOpen }) => (
  <>
    {collections && collections.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className="h-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          <PlusCircle className="h-8 w-8 mr-2" />
          Create New Collection
        </Button>
      </div>
    ) : (
      <EmptyState message="No collections found. Create your first collection!" icon={FolderPlus} />
    )}
  </>
);

export default CollectionsContent;