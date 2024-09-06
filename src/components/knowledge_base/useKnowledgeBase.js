import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { threads, pages, dataSources } from './mockData';
import { debounce } from 'lodash';

export const useKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [collections, setCollections] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [filterCriteria, setFilterCriteria] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { toast } = useToast();

  const handleOpenModal = useCallback((item, type) => {
    const setters = {
      thread: setSelectedThread,
      page: setSelectedPage,
      dataSource: setSelectedDataSource
    };
    setters[type](item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedThread(null);
    setSelectedPage(null);
    setSelectedDataSource(null);
  }, []);

  const handleCRUDOperation = useCallback((operation, type, id) => {
    try {
      // Simulated CRUD operation
      console.log(`${operation} ${type} with ID ${id}`);
      toast({
        title: `${operation} Successful`,
        description: `${type} with ID ${id} has been ${operation.toLowerCase()}d.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${operation.toLowerCase()} ${type}: ${error.message}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      const results = [...threads, ...pages, ...dataSources].filter(
        item => item.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    }, 300),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, debouncedSearch]);

  const sortAndFilterItems = useCallback((items) => {
    if (!Array.isArray(items)) {
      console.error('Expected an array for items, but received:', items);
      return [];
    }
    return items
      .filter(item => {
        for (let key in filterCriteria) {
          if (item[key] !== filterCriteria[key]) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortCriteria === 'date') {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortCriteria === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [sortCriteria, filterCriteria]);

  const processedThreads = sortAndFilterItems(threads);
  const processedPages = sortAndFilterItems(pages);
  const processedDataSources = sortAndFilterItems(dataSources);

  const paginatedItems = useCallback((items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isCreateCollectionOpen,
    setIsCreateCollectionOpen,
    selectedThread,
    selectedPage,
    selectedDataSource,
    collections,
    handleOpenModal,
    handleCloseModal,
    handleCRUDOperation,
    threads: paginatedItems(processedThreads),
    pages: paginatedItems(processedPages),
    dataSources: paginatedItems(processedDataSources),
    setSortCriteria,
    setFilterCriteria,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(Math.max(processedThreads.length, processedPages.length, processedDataSources.length) / itemsPerPage),
  };
};