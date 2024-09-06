import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search } from 'lucide-react';
import CreateCollectionForm from '../CreateCollectionForm';
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
      <h2 className="text-xl font-semibold mb-4 text-gray-200">Collections</h2>
      <div className="bg-navy-800 p-6 rounded-lg shadow-md border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-100">agentic</h3>
            <p className="text-sm text-gray-400">0 threads • 1mo</p>
          </div>
          <div className="w-10 h-10 bg-navy-600 rounded-full flex items-center justify-center text-gray-200 font-bold">
            A
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-8 bg-navy-900 min-h-screen text-gray-100" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-gray-100">Library</h1>
        <div className="flex items-center space-x-4">
          <div className="relative w-80">
            <Input
              type="text"
              placeholder="Search your threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-700 text-gray-100 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <Button variant="secondary" className="text-gray-200 bg-navy-700 hover:bg-navy-600">
          <PlusCircle className="h-4 w-4 mr-2" />
          Thread
        </Button>
        <Button variant="secondary" className="text-gray-200 bg-navy-700 hover:bg-navy-600">
          <PlusCircle className="h-4 w-4 mr-2" />
          Page
        </Button>
        <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="text-gray-200 bg-navy-700 hover:bg-navy-600">
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

      <Tabs defaultValue="threads" className="mt-8">
        <TabsList className="bg-navy-800 p-1 rounded-lg">
          <TabsTrigger value="threads" className="data-[state=active]:bg-navy-700">Threads</TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-navy-700">Pages</TabsTrigger>
          <TabsTrigger value="dataSources" className="data-[state=active]:bg-navy-700">Data Sources</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-6 mt-8 text-gray-200">Threads</h2>
              <ThreadList threads={threads} onOpenModal={handleOpenThreadModal} />
            </div>
            {renderCollectionsCard()}
          </div>
        </TabsContent>
        <TabsContent value="pages">
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">Pages</h2>
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