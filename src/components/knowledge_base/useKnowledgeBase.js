import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { threads, pages, dataSources } from './mockData';

export const useKnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const { toast } = useToast();

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
    toast({
      title: "Page Deleted",
      description: `Page with ID ${pageId} has been deleted.`,
    });
  }, [toast]);

  const handleEditPage = useCallback((pageId) => {
    toast({
      title: "Edit Page",
      description: `Editing page with ID ${pageId}.`,
    });
  }, [toast]);

  const handleAddPageToCollection = useCallback((pageId) => {
    toast({
      title: "Add to Collection",
      description: `Adding page with ID ${pageId} to collection.`,
    });
  }, [toast]);

  return {
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
    threads,
    pages,
    dataSources,
  };
};