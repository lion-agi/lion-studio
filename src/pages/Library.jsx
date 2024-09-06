import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search, MessageSquare, FileText, FolderPlus } from 'lucide-react';
import CreateCollectionForm from '../components/CreateCollectionForm';
import ThreadList from '../components/library/ThreadList';
import PageItem from '../components/library/PageItem';
import CollectionItem from '../components/library/CollectionItem';
import DataSourceList from '../components/library/DataSourceList';
import ThreadModal from '../components/library/ThreadModal';
import PageModal from '../components/library/PageModal';
import DataSourceModal from '../components/library/DataSourceModal';
import EmptyState from '../components/library/EmptyState';
import { useKnowledgeBase } from '../components/library/useKnowledgeBase';

const Library = () => {
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
    collections,
  } = useKnowledgeBase();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const paginatedPages = pages ? pages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pb-1">Library</h1>
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search your library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <ActionButtons setIsCreateCollectionOpen={setIsCreateCollectionOpen} />

        <LibraryTabs
          threads={threads}
          pages={paginatedPages}
          collections={collections}
          dataSources={dataSources}
          handleOpenThreadModal={handleOpenThreadModal}
          handleOpenPageModal={handleOpenPageModal}
          handleDeletePage={handleDeletePage}
          handleEditPage={handleEditPage}
          handleOpenDataSourceModal={handleOpenDataSourceModal}
          setIsCreateCollectionOpen={setIsCreateCollectionOpen}
        />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil((pages?.length || 0) / itemsPerPage)}
        />

        <Modals
          selectedThread={selectedThread}
          selectedPage={selectedPage}
          selectedDataSource={selectedDataSource}
          handleCloseModal={handleCloseModal}
          isCreateCollectionOpen={isCreateCollectionOpen}
          setIsCreateCollectionOpen={setIsCreateCollectionOpen}
        />
      </div>
    </div>
  );
};

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

const PagesContent = ({ pages, handleOpenPageModal, handleDeletePage, handleEditPage }) => (
  <>
    {pages && pages.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <PageItem
            key={page.id}
            page={page}
            onOpenModal={handleOpenPageModal}
            onDelete={handleDeletePage}
            onEdit={handleEditPage}
          />
        ))}
        <Button
          onClick={() => handleOpenPageModal(null)}
          className="h-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          <PlusCircle className="h-8 w-8 mr-2" />
          Create New Page
        </Button>
      </div>
    ) : (
      <EmptyState message="No pages found. Create your first page!" icon={FileText} />
    )}
  </>
);

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

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  totalPages > 1 && (
    <div className="mt-8 flex justify-center">
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Previous
      </Button>
      <span className="mx-4 text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Next
      </Button>
    </div>
  )
);

const Modals = ({ selectedThread, selectedPage, selectedDataSource, handleCloseModal, isCreateCollectionOpen, setIsCreateCollectionOpen }) => (
  <>
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
  </>
);

export default Library;