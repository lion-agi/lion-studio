import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { useKnowledgeBase } from './useKnowledgeBase';

const KnowledgeBase = () => {
  const {
    searchTerm,
    setSearchTerm,
    pages,
    handleOpenPageModal,
    handleDeletePage,
    handleEditPage,
  } = useKnowledgeBase();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Library</h1>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search your threads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-96 bg-gray-800 text-gray-100 pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <Button variant="outline" className="text-gray-300 border-gray-700 hover:bg-gray-800">
            <PlusCircle className="h-4 w-4 mr-2" />
            Thread
          </Button>
          <Button variant="outline" className="text-gray-300 border-gray-700 hover:bg-gray-800">
            <PlusCircle className="h-4 w-4 mr-2" />
            Page
          </Button>
          <Button variant="outline" className="text-gray-300 border-gray-700 hover:bg-gray-800">
            <PlusCircle className="h-4 w-4 mr-2" />
            Collection
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Pages</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Page
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <div key={page.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{page.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{page.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{page.createdAt}</span>
                  <span>{page.views} views</span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenPageModal(page)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditPage(page.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePage(page.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Collections</h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">agentic</h3>
                <p className="text-sm text-gray-400">0 threads • 1mo</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;