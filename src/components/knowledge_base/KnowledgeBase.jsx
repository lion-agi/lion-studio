import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search, MessageSquare, FileText, FolderPlus } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-indigo-900 p-8 md:p-12 text-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0">Library</h1>
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search your threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy-800 text-gray-200 placeholder-gray-400 border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
              style={{ color: '#E2E8F0' }}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <Button variant="secondary" className="text-gray-200 bg-navy-700 hover:bg-navy-600 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Thread
          </Button>
          <Button variant="secondary" className="text-gray-200 bg-navy-700 hover:bg-navy-600 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Page
          </Button>
          <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="text-gray-200 bg-navy-700 hover:bg-navy-600 flex items-center">
                <FolderPlus className="h-4 w-4 mr-2" />
                Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-navy-800 text-gray-200">
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
              </DialogHeader>
              <CreateCollectionForm onClose={() => setIsCreateCollectionOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="threads" className="mt-8">
          <TabsList className="bg-navy-800 p-1 rounded-lg mb-6">
            <TabsTrigger value="threads" className="data-[state=active]:bg-navy-700 text-gray-200">Threads</TabsTrigger>
            <TabsTrigger value="pages" className="data-[state=active]:bg-navy-700 text-gray-200">Pages</TabsTrigger>
            <TabsTrigger value="dataSources" className="data-[state=active]:bg-navy-700 text-gray-200">Data Sources</TabsTrigger>
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
              <h2 className="text-xl font-semibold mb-6 text-gray-200">Data Sources</h2>
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
    </div>
  );
};

export default KnowledgeBase;