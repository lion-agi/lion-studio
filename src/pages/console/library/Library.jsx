import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import LibraryTabs from '../../../features/library/components/LibraryTabs';
import Pagination from '../../../features/library/components/Pagination';
import Modals from './Modals';
import PageForm from '../../../features/library/components/PageForm';
import { usePages, useAddPage, useUpdatePage, useDeletePage } from '../../../integrations/supabase/hooks/pages';
import { useThreads } from '../../../integrations/supabase/hooks/threads';
import { useDataSources } from '../../../integrations/supabase/hooks/dataSources';
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
          <li>Data Sources: External data connections</li>
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
  const { data: dataSources, isLoading: dataSourcesLoading, error: dataSourcesError } = useDataSources();
  
  const addPage = useAddPage();
  const updatePage = useUpdatePage();
  const deletePage = useDeletePage();

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const itemsPerPage = 12;

  const handleOpenThreadModal = (thread) => setSelectedThread(thread);
  const handleOpenPageModal = (page) => setSelectedPage(page);
  const handleOpenDataSourceModal = (dataSource) => setSelectedDataSource(dataSource);
  const handleCloseModal = () => {
    setSelectedThread(null);
    setSelectedPage(null);
    setSelectedDataSource(null);
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
    setIsCreatePageOpen(true);
  };

  const handleCreatePage = async (pageData) => {
    try {
      if (selectedPage) {
        await updatePage.mutateAsync({ id: selectedPage.id, ...pageData });
      } else {
        await addPage.mutateAsync(pageData);
      }
      setIsCreatePageOpen(false);
      setSelectedPage(null);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleCreateNewPage = () => {
    setSelectedPage(null);
    setIsCreatePageOpen(true);
  };

  const filteredPages = pages?.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedPages = filteredPages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const isLoading = pagesLoading || threadsLoading || dataSourcesLoading;
  const error = pagesError || threadsError || dataSourcesError;

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
            collections={[]} // You might want to add a hook for collections
            dataSources={dataSources}
            handleOpenThreadModal={handleOpenThreadModal}
            handleOpenPageModal={handleOpenPageModal}
            handleDeletePage={handleDeletePage}
            handleEditPage={handleEditPage}
            handleOpenDataSourceModal={handleOpenDataSourceModal}
            setIsCreateCollectionOpen={setIsCreateCollectionOpen}
            handleCreateNewPage={handleCreateNewPage}
            error={error}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredPages.length / itemsPerPage)}
          />

          <Modals
            selectedThread={selectedThread}
            selectedPage={selectedPage}
            selectedDataSource={selectedDataSource}
            handleCloseModal={handleCloseModal}
            isCreateCollectionOpen={isCreateCollectionOpen}
            setIsCreateCollectionOpen={setIsCreateCollectionOpen}
          />

          <PageForm
            page={selectedPage}
            isOpen={isCreatePageOpen}
            onClose={() => setIsCreatePageOpen(false)}
            onSave={handleCreatePage}
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