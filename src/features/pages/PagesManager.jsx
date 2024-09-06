import React, { useState, useEffect } from 'react';
import PageList from './PageList';
import PageModal from './PageModal';
import PageForm from './PageForm';
import { usePages, useAddPage, useUpdatePage, useDeletePage } from '@/integrations/supabase/hooks/pages';
import { useToast } from "@/components/ui/use-toast";

const PagesManager = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: pages, isLoading, isError } = usePages();
  const addPageMutation = useAddPage();
  const updatePageMutation = useUpdatePage();
  const deletePageMutation = useDeletePage();
  const { toast } = useToast();

  const handleOpenModal = (page) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPage(null);
    setIsModalOpen(false);
  };

  const handleCreateNew = () => {
    setSelectedPage(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleEdit = (page) => {
    setSelectedPage(page);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDelete = async (pageId) => {
    try {
      await deletePageMutation.mutateAsync(pageId);
      toast({
        title: "Success",
        description: "Page deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (pageData) => {
    try {
      if (isEditing) {
        await updatePageMutation.mutateAsync({ id: selectedPage.id, ...pageData });
        toast({
          title: "Success",
          description: "Page updated successfully",
        });
      } else {
        await addPageMutation.mutateAsync(pageData);
        toast({
          title: "Success",
          description: "Page created successfully",
        });
      }
      setIsFormOpen(false);
      setSelectedPage(null);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading pages</div>;

  return (
    <div>
      <PageList
        pages={pages}
        onOpenModal={handleOpenModal}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onCreateNew={handleCreateNew}
      />
      <PageModal
        page={selectedPage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEdit}
      />
      <PageForm
        page={isEditing ? selectedPage : null}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default PagesManager;