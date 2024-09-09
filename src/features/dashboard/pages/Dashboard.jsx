import React, { useState, useEffect, useRef } from 'react';
import { WorkflowEditor } from '@/features/workflow';
import Sidebar from '@/common/components/Sidebar';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import { useToast } from "@/common/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";

const Dashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editorSize, setEditorSize] = useState({ width: 0, height: 0 });
  const editorContainerRef = useRef(null);
  const { toast } = useToast();

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);

  useEffect(() => {
    const updateSize = () => {
      if (editorContainerRef.current) {
        setEditorSize({
          width: editorContainerRef.current.offsetWidth,
          height: editorContainerRef.current.offsetHeight,
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleSearch = () => {
    toast({
      title: "Search",
      description: `Searching for: ${searchTerm}`,
    });
    // Implement search functionality here
  };

  return (
    <div className="h-screen bg-background text-foreground flex">
      <Sidebar
        expanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="p-8 space-y-6 h-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Dashboard</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsInfoModalOpen(true)}
                className="text-gray-400 hover:text-gray-100"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative w-full md:w-80">
              <Input
                type="text"
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
              />
              <Search 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" 
                onClick={handleSearch}
              />
            </div>
          </div>

          <div ref={editorContainerRef} className="relative h-full">
            <WorkflowEditor />
          </div>
        </div>
      </div>

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Dashboard Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>Welcome to your dashboard! Here you can:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>View and manage your workflows</li>
              <li>Search for specific workflows</li>
              <li>Access quick statistics and insights</li>
            </ul>
            <p className="mt-4">Use the sidebar to navigate between different sections of the application.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;