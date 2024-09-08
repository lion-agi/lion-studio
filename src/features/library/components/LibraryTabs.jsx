import React from 'react';
import { TabsContent } from "@/common/components/ui/tabs";
import { MessageSquare, FolderPlus } from 'lucide-react';
import ThreadList from './ThreadList';
import PagesContent from './PagesContent';
import CollectionsContent from './CollectionsContent';
import EmptyState from './EmptyState';
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import TabSwitchBar from '@/common/components/TabSwitchBar';

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
  <div className="mt-8">
    <TabSwitchBar />
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
  </div>
);

export default LibraryTabs;
