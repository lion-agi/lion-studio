import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { MessageSquare, FolderPlus } from 'lucide-react';
import ThreadList from './ThreadList';
import PagesContent from './PagesContent';
import CollectionsContent from './CollectionsContent';
import EmptyState from './EmptyState';
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const LibraryTabs = ({ 
  activeTab,
  onTabChange,
  threads, 
  pages, 
  collections, 
  handleOpenThreadModal, 
  handleOpenPageModal, 
  handleDeletePage, 
  handleEditPage, 
  setIsCreateCollectionOpen,
  handleCreateNewPage,
  error
}) => (
  <Tabs value={activeTab} onValueChange={onTabChange} className="mt-8">
    <TabsList className="bg-gray-800 mb-6">
      <TabsTrigger value="threads" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Threads</TabsTrigger>
      <TabsTrigger value="pages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Pages</TabsTrigger>
      <TabsTrigger value="collections" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6 py-3">Collections</TabsTrigger>
    </TabsList>
    {error ? (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message || "An unknown error occurred"}</AlertDescription>
      </Alert>
    ) : (
      <>
        <TabsContent value="threads" className="mt-6">
          {threads && threads.length > 0 ? (
            <ThreadList threads={threads} onOpenModal={handleOpenThreadModal} />
          ) : (
            <EmptyState message="No threads found. Create your first thread!" icon={MessageSquare} />
          )}
        </TabsContent>
        <TabsContent value="pages" className="mt-6">
          <PagesContent 
            pages={pages} 
            handleOpenPageModal={handleOpenPageModal} 
            handleDeletePage={handleDeletePage} 
            handleEditPage={handleEditPage}
            handleCreateNewPage={handleCreateNewPage}
          />
        </TabsContent>
        <TabsContent value="collections" className="mt-6">
          <CollectionsContent 
            collections={collections} 
            handleOpenPageModal={handleOpenPageModal} 
            handleDeletePage={handleDeletePage} 
            handleEditPage={handleEditPage} 
            setIsCreateCollectionOpen={setIsCreateCollectionOpen} 
          />
        </TabsContent>
      </>
    )}
  </Tabs>
);

export default LibraryTabs;

// Path: src/features/library/components/LibraryTabs.jsx