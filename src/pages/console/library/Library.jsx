import React, { useState, useEffect } from 'react';
import { Input } from "@/common/components/ui/input";
import { Search } from 'lucide-react';
import LibraryTabs from '../../../features/library/components/LibraryTabs';
import Pagination from '../../../features/library/components/Pagination';
import Modals from './Modals';
import PageForm from '../../../features/library/components/PageForm';
import { useKnowledgeBase } from '../../../features/library/useKnowledgeBase';
import { addSamplePages } from '../../../integrations/supabase/hooks/pages';
import { createThreadsTableWithSampleData } from '../../../integrations/supabase/hooks/threads';
import { createDataSourcesTableWithSampleData } from '../../../integrations/supabase/hooks/dataSources';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);

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
    handleCreatePage,
    handleCreateNewPage,
    isCreatePageOpen,
    setIsCreatePageOpen,
    threads,
    pages,
    dataSources,
    collections,
    isLoading,
    error,
    refetchAll,
  } = useKnowledgeBase();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const paginatedPages = pages ? pages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  useEffect(() => {
    const initializeTables = async () => {
      try {
        await addSamplePages();
        await createThreadsTableWithSampleData();
        await createDataSourcesTableWithSampleData();
        refetchAll();
      } catch (error) {
        console.error('Error initializing tables:', error);
      }
    };

    initializeTables();
  }, [refetchAll]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100">Library</h1>
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
          handleCreateNewPage={handleCreateNewPage}
          error={error}
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

        <PageForm
          page={null}
          isOpen={isCreatePageOpen}
          onClose={() => setIsCreatePageOpen(false)}
          onSave={handleCreatePage}
        />
      </div>
    </div>
  );
};

export default Library;