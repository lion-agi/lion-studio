import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search } from 'lucide-react';
import CreateCollectionForm from '../CreateCollectionForm';
import ThreadList from './ThreadList';
import PageItem from './PageItem';
import CollectionItem from './CollectionItem';
import DataSourceList from './DataSourceList';
import ThreadModal from './ThreadModal';
import PageModal from './PageModal';
import DataSourceModal from './DataSourceModal';
import EmptyState from './EmptyState';
import { useKnowledgeBase } from './useKnowledgeBase';

const KnowledgeBase = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isCreateCollectionOpen,
    setIsCreateCollectionOpen,
    selectedThread,
    selectedPage,
    selectedDataSource,
    handleOpenModal,
    handleCloseModal,
    handleCRUDOperation,
    threads,
    pages,
    dataSources,
    collections,
    setSortCriteria,
    setFilterCriteria,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useKnowledgeBase();

  const renderPagination = () => (
    <div className="flex justify-center mt-4 space-x-2">
      <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
        Previous
      </Button>
      <span className="self-center">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );

  const renderContent = (items, ItemComponent, emptyMessage, itemType) => {
    if (items.length === 0) {
      return <EmptyState message={emptyMessage} />;
    }
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemComponent
              key={item.id}
              item={item}
              onOpenModal={() => handleOpenModal(item, itemType)}
              onDelete={() => handleCRUDOperation('Delete', itemType, item.id)}
              onEdit={() => handleCRUDOperation('Edit', itemType, item.id)}
            />
          ))}
        </div>
        {renderPagination()}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-indigo-900 p-8 text-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0">Library</h1>
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-800 text-gray-200 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-navy-800 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Tabs defaultValue="threads" className="mt-8">
          <TabsList className="bg-navy-800 p-1 rounded-lg mb-6">
            <TabsTrigger value="threads">Threads</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="dataSources">Data Sources</TabsTrigger>
          </TabsList>
          <TabsContent value="threads">
            {renderContent(threads, ThreadList, "No threads found. Create your first thread!", "thread")}
          </TabsContent>
          <TabsContent value="pages">
            {renderContent(pages, PageItem, "No pages found. Create your first page!", "page")}
          </TabsContent>
          <TabsContent value="collections">
            {renderContent(collections, CollectionItem, "No collections found. Create your first collection!", "collection")}
          </TabsContent>
          <TabsContent value="dataSources">
            {renderContent(dataSources, DataSourceList, "No data sources found. Add your first data source!", "dataSource")}
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

        <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <CreateCollectionForm onClose={() => setIsCreateCollectionOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default KnowledgeBase;