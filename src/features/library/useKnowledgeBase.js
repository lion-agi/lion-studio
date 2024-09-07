import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/common/components/ui/use-toast";
import { threads as mockThreads, pages as initialPages, dataSources as mockDataSources } from './mockData';
import { supabase } from '@/integrations/supabase/supabase';

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
  const [pages, setPages] = useState([]);
  const [threads, setThreads] = useState(mockThreads);
  const { toast } = useToast();

  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState([]);
  const [dataSources, setDataSources] = useState(mockDataSources);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('pages').select('*');
      if (error) throw error;
      setPages(data);
    } catch (error) {
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to fetch pages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleDeletePage = useCallback(async (pageId) => {
    try {
      const { error } = await supabase.from('pages').delete().eq('id', pageId);
      if (error) throw error;
      setPages(prevPages => prevPages.filter(page => page.id !== pageId));
      toast({
        title: "Page Deleted",
        description: `Page with ID ${pageId} has been deleted.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete page: ${error.message}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleEditPage = useCallback(async (pageId, updatedPageData) => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .update(updatedPageData)
        .eq('id', pageId)
        .single();

      if (error) throw error;

      setPages(prevPages => prevPages.map(page => 
        page.id === pageId ? { ...page, ...data } : page
      ));
      toast({
        title: "Page Updated",
        description: `Page with ID ${pageId} has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update page: ${error.message}`,
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleCreatePage = useCallback(async (pageData) => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .insert([pageData])
        .single();

      if (error) throw error;

      setPages(prevPages => [...prevPages, data]);
      setIsCreatePageOpen(false);
      toast({
        title: "Success",
        description: "New page created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create page: ${error.message}`,
        variant: "destructive",
      });
    }
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