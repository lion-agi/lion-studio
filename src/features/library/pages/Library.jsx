import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import LibraryTabs from '@/features/library/components/LibraryTabs';
import Pagination from '@/features/library/components/Pagination';
import PageForm from '@/features/library/components/PageForm';
import CollectionForm from '@/features/library/components/CollectionForm';
import CollectionModal from '@/features/library/components/CollectionModal';
import { usePages, useAddPage, useUpdatePage, useDeletePage } from '@/integrations/supabase/hooks/pages';
import { useThreads } from '@/integrations/supabase/hooks/threads';
import { useCollections, useAddCollection, useUpdateCollection, useDeleteCollection } from '@/integrations/supabase/hooks/collections';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

const InfoModal = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
      <DialogHeader>
        <DialogTitle>Library Information</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p>The Library is your central hub for managing all your content:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Threads: Conversation chains and discussions</li>
          <li>Pages: Individual documents and notes</li>
          <li>Collections: Organized groups of related content</li>
        </ul>
        <p className="mt-4">Use the search bar to quickly find specific items across all categories.</p>
      </div>
    </DialogContent>
  </Dialog>
);

const Library = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'threads';

  const { data: pages, isLoading: pagesLoading, error: pagesError } = usePages();
  const { data: threads, isLoading: threadsLoading, error: threadsError } = useThreads();
  const { data: collections, isLoading: collectionsLoading, error: collectionsError } = useCollections();
  
  const addPage = useAddPage();
  const updatePage = useUpdatePage();
  const deletePage = useDeletePage();
  const addCollection = useAddCollection();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [isPageFormOpen, setIsPageFormOpen] = useState(false);
  const [isCollectionFormOpen, setIsCollectionFormOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const itemsPerPage = 12;

  const handleOpenThreadModal = (thread) => setSelectedThread(thread);
  const handleOpenPageModal = (page) => setSelectedPage(page);
  const handleOpenCollectionModal = (collection) => {
    setSelectedCollection(collection);
    setIsCollectionModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedThread(null);
    setSelectedPage(null);
    setSelectedCollection(null);
    setIsCollectionModalOpen(false);
  };

  const handleDeletePage = async (id) => {
    try {
      await deletePage.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleEditPage = (page) => {
    setSelectedPage(page);
    setIsPageFormOpen(true);
  };

  const handleCreatePage = async (pageData) => {
    try {
      if (selectedPage) {
        await updatePage.mutateAsync({ id: selectedPage.id, ...pageData });
      } else {
        await addPage.mutateAsync(pageData);
      }
      setIsPageFormOpen(false);
      setSelectedPage(null);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleCreateNewPage = () => {
    setSelectedPage(null);
    setIsPageFormOpen(true);
  };

  const handleDeleteCollection = async (id) => {
    try {
      await deleteCollection.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const handleEditCollection = (collection) => {
    setSelectedCollection(collection);
    setIsCollectionFormOpen(true);
  };

  const handleCreateCollection = async (collectionData) => {
    try {
      if (selectedCollection) {
        await updateCollection.mutateAsync({ id: selectedCollection.id, ...collectionData });
      } else {
        await addCollection.mutateAsync(collectionData);
      }
      setIsCollectionFormOpen(false);
      setSelectedCollection(null);
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  const handleCreateNewCollection = () => {
    setSelectedCollection(null);
    setIsCollectionFormOpen(true);
  };

  const filteredPages = pages?.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const filteredCollections = collections?.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedPages = filteredPages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedCollections = filteredCollections.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isLoading = pagesLoading || threadsLoading || collectionsLoading;
  const error = pagesError || threadsError || collectionsError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Library</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsInfoModalOpen(true)}
                className="text-gray-400 hover:text-gray-100"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
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

          <LibraryTabs
            activeTab={activeTab}
            onTabChange={(newTab) => setSearchParams({ tab: newTab })}
            threads={threads}
            pages={paginatedPages}
            collections={paginatedCollections}
            handleOpenThreadModal={handleOpenThreadModal}
            handleOpenPageModal={handleOpenPageModal}
            handleOpenCollectionModal={handleOpenCollectionModal}
            handleDeletePage={handleDeletePage}
            handleEditPage={handleEditPage}
            handleDeleteCollection={handleDeleteCollection}
            handleEditCollection={handleEditCollection}
            handleCreateNewPage={handleCreateNewPage}
            handleCreateNewCollection={handleCreateNewCollection}
            error={error}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(
              (activeTab === 'pages' ? filteredPages.length : 
               activeTab === 'collections' ? filteredCollections.length : 
               threads?.length || 0) / itemsPerPage
            )}
          />

          <PageForm
            page={selectedPage}
            isOpen={isPageFormOpen}
            onClose={() => setIsPageFormOpen(false)}
            onSave={handleCreatePage}
          />

          <CollectionForm
            collection={selectedCollection}
            isOpen={isCollectionFormOpen}
            onClose={() => setIsCollectionFormOpen(false)}
            onSave={handleCreateCollection}
          />

          <CollectionModal
            collection={selectedCollection}
            isOpen={isCollectionModalOpen}
            onClose={() => setIsCollectionModalOpen(false)}
          />

          <InfoModal
            isOpen={isInfoModalOpen}
            onClose={() => setIsInfoModalOpen(false)}
          />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Library;
