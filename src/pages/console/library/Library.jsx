import React, { useState } from 'react';
import { Input } from "@/common/components/ui/input";
import { Search } from 'lucide-react';
import LibraryTabs from '../../../features/library/components/LibraryTabs';
import Pagination from '../../../features/library/components/Pagination';
import Modals from './Modals';
import { useKnowledgeBase } from '../../../features/library/useKnowledgeBase';

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
    handleCreateNewPage,
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

export default Library;