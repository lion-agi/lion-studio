import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search } from 'lucide-react';
import CreateCollectionForm from './CreateCollectionForm';
import ThreadList from './ThreadList';
import PageList from './PageList';
import DataSourceList from './DataSourceList';
import ThreadModal from './ThreadModal';
import PageModal from './PageModal';
import DataSourceModal from './DataSourceModal';
import { useKnowledgeBase } from './useKnowledgeBase';

const KnowledgeBase = () => {
  const {
    searchTerm,
    setSearchTerm,
    isCreateCollectionOpen,
    setIsCreateCollectionOpen,
    selectedThread,
    selectedPage,
    selectedDataSource,
    handleOpenThreadModal,
    handleOpenPageModal,
    handleOpenDataSourceModal,
    handleCloseModal,
    handleDeletePage,
    handleEditPage,
    handleAddPageToCollection,
    threads,
    pages,
    dataSources,
  } = useKnowledgeBase();

  const renderCollectionsCard = () => (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 group-name">Collections</h2>
      <div className="bg-card p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">agentic</h3>
            <p className="text-sm text-muted-foreground">0 threads • 1mo</p>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Library</h1>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search your threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <Button variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Thread
        </Button>
        <Button variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Page
        </Button>
        <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Collection</DialogTitle>
            </DialogHeader>
            <CreateCollectionForm onClose={() => setIsCreateCollectionOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="threads">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="dataSources">Data Sources</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6 mt-8 group-name">Threads</h2>
              <ThreadList threads={threads} onOpenModal={handleOpenThreadModal} />
            </div>
            {renderCollectionsCard()}
          </div>
        </TabsContent>
        <TabsContent value="pages">
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-6 group-name">Pages</h2>
            <PageList 
              pages={pages} 
              onOpenModal={handleOpenPageModal}
              onDelete={handleDeletePage}
              onEdit={handleEditPage}
              onAddToCollection={handleAddPageToCollection}
            />
            {renderCollectionsCard()}
          </div>
        </TabsContent>
        <TabsContent value="dataSources">
          <div className="mt-8">
            <DataSourceList dataSources={dataSources} onOpenModal={handleOpenDataSourceModal} />
          </div>
        </TabsContent>
      </Tabs>

      {selectedThread && (
        <ThreadModal
          thread={selectedThread}
          isOpen={!!selectedThread}
          onClose={handleCloseModal}
        />
      )}

      {selectedPage && (
        <PageModal
          page={selectedPage}
          isOpen={!!selectedPage}
          onClose={handleCloseModal}
        />
      )}

      {selectedDataSource && (
        <DataSourceModal
          dataSource={selectedDataSource}
          isOpen={!!selectedDataSource}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default KnowledgeBase;