import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/common/components/ui/use-toast";
import { threads as mockThreads, dataSources as mockDataSources } from './mockData';
import { supabase } from '@/integrations/supabase/supabase';
import { usePages, useAddPage, useUpdatePage, useDeletePage } from '@/integrations/supabase/hooks/pages';

export const useKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ threads: [], pages: [], dataSources: [] });
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [collections, setCollections] = useState([]);
  const [threads, setThreads] = useState(mockThreads);
  const { toast } = useToast();

  const [isCreatePageOpen, setIsCreatePageOpen] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState([]);
  const [dataSources, setDataSources] = useState(mockDataSources);

  const { data: pages, isLoading, error } = usePages();
  const addPageMutation = useAddPage();
  const updatePageMutation = useUpdatePage();
  const deletePageMutation = useDeletePage();

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
      await deletePageMutation.mutateAsync(pageId);
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
  }, [deletePageMutation, toast]);

  const handleEditPage = useCallback(async (pageId, updatedPageData) => {
    try {
      await updatePageMutation.mutateAsync({ id: pageId, ...updatedPageData });
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
  }, [updatePageMutation, toast]);

  const handleCreatePage = useCallback(async (pageData) => {
    try {
      await addPageMutation.mutateAsync(pageData);
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
  }, [addPageMutation, toast]);

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