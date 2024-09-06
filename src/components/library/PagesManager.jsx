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
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/pages');
      if (!response.ok) {
        throw new Error('Failed to fetch pages');
      }
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      // You might want to set an error state here and display it to the user
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
      const response = await fetch(`/api/pages/${pageId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      setPages(pages.filter(page => page.id !== pageId));
    } catch (error) {
      console.error('Error deleting page:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleSave = async (pageData) => {
    try {
      let response;
      if (isEditing) {
        response = await fetch(`/api/pages/${selectedPage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pageData),
        });
      } else {
        response = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pageData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save page');
      }

      const savedPage = await response.json();

      if (isEditing) {
        setPages(pages.map(page => page.id === savedPage.id ? savedPage : page));
      } else {
        setPages([savedPage, ...pages]);
      }

      setIsFormOpen(false);
      setSelectedPage(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving page:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
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