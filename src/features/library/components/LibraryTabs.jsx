import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { MessageSquare, FolderPlus } from 'lucide-react';
import ThreadList from './ThreadList';
import PagesContent from './PagesContent';
import CollectionsContent from './CollectionsContent';
import DataSourceList from './DataSourceList';
import EmptyState from './EmptyState';
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const LibraryTabs = ({ 
  activeTab,
  onTabChange,
  threads, 
  pages, 
  collections, 
  dataSources, 
  handleOpenThreadModal, 
  handleOpenPageModal, 
  handleDeletePage, 
  handleEditPage, 
  handleOpenDataSourceModal, 
  setIsCreateCollectionOpen,
  handleCreateNewPage,
  error
}) => (
  <Tabs value={activeTab} onValueChange={onTabChange} className="mt-8">
    <TabsList className="bg-gray-800">
      <TabsTrigger value="threads" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Threads</TabsTrigger>
      <TabsTrigger value="pages" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Pages</TabsTrigger>
      <TabsTrigger value="collections" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Collections</TabsTrigger>
      <TabsTrigger value="dataSources" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Data Sources</TabsTrigger>
    </TabsList>
    {error ? (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message || "An unknown error occurred"}</AlertDescription>
      </Alert>
    ) : (
      <>
        <TabsContent value="threads">
          {threads && threads.length > 0 ? (
            <ThreadList threads={threads} onOpenModal={handleOpenThreadModal} />
          ) : (
            <EmptyState message="No threads found. Create your first thread!" icon={MessageSquare} />
          )}
        </TabsContent>
        <TabsContent value="pages">
          <PagesContent 
            pages={pages} 
            handleOpenPageModal={handleOpenPageModal} 
            handleDeletePage={handleDeletePage} 
            handleEditPage={handleEditPage}
            handleCreateNewPage={handleCreateNewPage}
          />
        </TabsContent>
        <TabsContent value="collections">
          <CollectionsContent 
            collections={collections} 
            handleOpenPageModal={handleOpenPageModal} 
            handleDeletePage={handleDeletePage} 
            handleEditPage={handleEditPage} 
            setIsCreateCollectionOpen={setIsCreateCollectionOpen} 
          />
        </TabsContent>
        <TabsContent value="dataSources">
          {dataSources ? (
            <DataSourceList dataSources={dataSources} onOpenModal={handleOpenDataSourceModal} />
          ) : (
            <EmptyState message="No data sources found. Add your first data source!" icon={FolderPlus} />
          )}
        </TabsContent>
      </>
    )}
  </Tabs>
);

export default LibraryTabs;