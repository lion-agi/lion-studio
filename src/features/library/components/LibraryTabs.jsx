import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { MessageSquare, FolderPlus } from 'lucide-react';
import ThreadList from './ThreadList';
import PagesContent from './PagesContent';
import CollectionsContent from './CollectionsContent';
import DataSourceList from './DataSourceList';
import EmptyState from './EmptyState';

const LibraryTabs = ({ threads, pages, collections, dataSources, handleOpenThreadModal, handleOpenPageModal, handleDeletePage, handleEditPage, handleOpenDataSourceModal, setIsCreateCollectionOpen }) => (
  <Tabs defaultValue="threads" className="mt-8">
    <TabsList className="bg-gray-800 p-1 rounded-lg mb-6">
      <TabsTrigger value="threads" className="data-[state=active]:bg-purple-700 text-gray-200">Threads</TabsTrigger>
      <TabsTrigger value="pages" className="data-[state=active]:bg-purple-700 text-gray-200">Pages</TabsTrigger>
      <TabsTrigger value="collections" className="data-[state=active]:bg-purple-700 text-gray-200">Collections</TabsTrigger>
      <TabsTrigger value="dataSources" className="data-[state=active]:bg-purple-700 text-gray-200">Data Sources</TabsTrigger>
    </TabsList>
    <TabsContent value="threads">
      {threads && threads.length > 0 ? (
        <ThreadList threads={threads} onOpenModal={handleOpenThreadModal} />
      ) : (
        <EmptyState message="No threads found. Create your first thread!" icon={MessageSquare} />
      )}
    </TabsContent>
    <TabsContent value="pages">
      <PagesContent pages={pages} handleOpenPageModal={handleOpenPageModal} handleDeletePage={handleDeletePage} handleEditPage={handleEditPage} />
    </TabsContent>
    <TabsContent value="collections">
      <CollectionsContent collections={collections} handleOpenPageModal={handleOpenPageModal} handleDeletePage={handleDeletePage} handleEditPage={handleEditPage} setIsCreateCollectionOpen={setIsCreateCollectionOpen} />
    </TabsContent>
    <TabsContent value="dataSources">
      {dataSources ? (
        <DataSourceList dataSources={dataSources} onOpenModal={handleOpenDataSourceModal} />
      ) : (
        <EmptyState message="No data sources found. Add your first data source!" icon={FolderPlus} />
      )}
    </TabsContent>
  </Tabs>
);

export default LibraryTabs;