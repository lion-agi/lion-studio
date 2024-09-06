import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/common/components/ui/use-toast";
import { threads, pages as initialPages, dataSources } from '../components/mockData';
import { debounce } from 'lodash';

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
  const { toast } = useToast();

  // Enhance search functionality
  const debouncedSearch = useCallback(
    debounce((term) => {
      setIsLoading(true);
      setError(null);
      try {
        const results = {
          threads: threads.filter(t => t.title.toLowerCase().includes(term.toLowerCase())),
          pages: pages.filter(p => p.title.toLowerCase().includes(term.toLowerCase())),
          dataSources: Object.values(dataSources).flat().filter(d => d.name.toLowerCase().includes(term.toLowerCase()))
        };
        setSearchResults(results);
      } catch (err) {
        setError('An error occurred while searching');
        toast({
          title: "Search Error",
          description: "Failed to perform search. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

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

  const handleAddPageToCollection = useCallback((pageId, collectionId) => {
    setCollections(prevCollections => prevCollections.map(collection => 
      collection.id === collectionId
        ? { ...collection, pages: [...collection.pages, pageId] }
        : collection
    ));
    toast({
      title: "Page Added to Collection",
      description: `Page added to collection successfully.`,
    });
  }, [toast]);

  const addCollection = useCallback((newCollection) => {
    setCollections(prevCollections => [...prevCollections, newCollection]);
    toast({
      title: "Collection Created",
      description: "New collection has been created successfully.",
    });
  }, [toast]);

  const deleteCollection = useCallback((collectionId) => {
    setCollections(prevCollections => prevCollections.filter(collection => collection.id !== collectionId));
    toast({
      title: "Collection Deleted",
      description: `Collection with ID ${collectionId} has been deleted.`,
    });
  }, [toast]);

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
    handleOpenThreadModal,
    handleOpenPageModal,
    handleOpenDataSourceModal,
    handleCloseModal,
    handleDeletePage,
    handleEditPage,
    handleAddPageToCollection,
    addCollection,
    deleteCollection,
    threads,
    dataSources,
  };
};