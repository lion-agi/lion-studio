import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/common/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/supabase';

export const useKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ threads: [], pages: [], dataSources: [] });
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [collections, setCollections] = useState([]);
  const [threads, setThreads] = useState([]);
  const [pages, setPages] = useState([]);
  const [dataSources, setDataSources] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState([]);

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
      console.error('Error fetching pages:', error);
      setError(error);
      toast({
        title: "Error",
        description: "Failed to fetch pages. Please try again later.",
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
        description: "The page has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
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
        .select();
      if (error) throw error;
      setPages(prevPages => prevPages.map(page => page.id === pageId ? data[0] : page));
      toast({
        title: "Page Updated",
        description: "The page has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating page:', error);
      toast({
        title: "Error",
        description: "Failed to update page. Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleCreatePage = useCallback(async (pageData) => {
    try {
      const { data, error } = await supabase.from('pages').insert([pageData]).select();
      if (error) throw error;
      setPages(prevPages => [...prevPages, data[0]]);
      setIsCreatePageOpen(false);
      toast({
        title: "Success",
        description: "New page created successfully.",
      });
    } catch (error) {
      console.error('Error creating page:', error);
      toast({
        title: "Error",
        description: "Failed to create page. Please try again.",
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