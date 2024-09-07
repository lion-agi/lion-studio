import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/common/components/ui/use-toast";
import { threads as mockThreads, pages as initialPages, dataSources as mockDataSources } from './mockData';

export const useKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ threads: [], pages: [], dataSources: [] });
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [pages, setPages] = useState(initialPages);
  const [threads, setThreads] = useState(mockThreads);
  const { toast } = useToast();

  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState([]);
  const [dataSources, setDataSources] = useState(mockDataSources);

  useEffect(() => {
    // Simulating API calls to fetch data
    setThreads(mockThreads);
    setDataSources(mockDataSources);
  }, []);

  useEffect(() => {
    // Simulating API call to fetch threads
    setThreads(mockThreads);
  }, []);

  const handleOpenThreadModal = useCallback((thread) => {
    setSelectedThread(thread);
  }, []);

  const handleOpenPageModal = useCallback((page) => {
    setSelectedPage(page);
  }, []);

  const handleOpenDataSourceModal = useCallback((dataSource) => {
    setSelectedDataSource(dataSource);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedThread(null);
    setSelectedPage(null);
    setSelectedDataSource(null);
    setIsCreatePageOpen(false);
  }, []);

  const handleDeletePage = useCallback((pageId) => {
    setPages(prevPages => prevPages.filter(page => page.id !== pageId));
    toast({
      title: "Page Deleted",
      description: `Page with ID ${pageId} has been deleted.`,
    });
  }, [toast]);

  const handleEditPage = useCallback((pageId, updatedPageData) => {
    setPages(prevPages => prevPages.map(page => 
      page.id === pageId ? { ...page, ...updatedPageData } : page
    ));
    toast({
      title: "Page Updated",
      description: `Page with ID ${pageId} has been updated.`,
    });
  }, [toast]);

  const handleCreatePage = useCallback((pageData) => {
    const newPage = {
      id: `page-${Date.now()}`,
      ...pageData,
      created_at: new Date().toISOString(),
      views: 0,
    };

    setPages(prevPages => [...prevPages, newPage]);
    setIsCreatePageOpen(false);
    toast({
      title: "Success",
      description: "New page created successfully.",
    });
  }, [toast]);

  const handleCreateNewPage = useCallback(() => {
    setIsCreatePageOpen(true);
  }, []);

  const toggleThreadSelection = useCallback((thread) => {
    setSelectedThreads(prev => 
      prev.some(t => t.id === thread.id)
        ? prev.filter(t => t.id !== thread.id)
        : [...prev, thread]
    );
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isCreateCollectionOpen,
    setIsCreateCollectionOpen,
    selectedThread,
    selectedPage,
    selectedDataSource,
    isLoading,
    error,
    collections,
    pages,
    threads,
    handleOpenThreadModal,
    handleOpenPageModal,
    handleOpenDataSourceModal,
    handleCloseModal,
    handleDeletePage,
    handleEditPage,
    isCreatePageOpen,
    setIsCreatePageOpen,
    selectedThreads,
    toggleThreadSelection,
    handleCreatePage,
    handleCreateNewPage,
    dataSources,
  };
};