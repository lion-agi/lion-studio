import React, { useState, useEffect } from 'react';
import PageList from './PageList';
import PageModal from './PageModal';
import PageForm from './PageForm';

const PagesManager = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch pages from API
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/pages');
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

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
      await fetch(`/api/pages/${pageId}`, { method: 'DELETE' });
      setPages(pages.filter(page => page.id !== pageId));
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handleSave = async (pageData) => {
    try {
      if (isEditing) {
        const response = await fetch(`/api/pages/${selectedPage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pageData),
        });
        const updatedPage = await response.json();
        setPages(pages.map(page => page.id === updatedPage.id ? updatedPage : page));
      } else {
        const response = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pageData),
        });
        const newPage = await response.json();
        setPages([newPage, ...pages]);
      }
      setIsFormOpen(false);
      setSelectedPage(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

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