import React, { useState, useEffect, useRef } from 'react';
import { WorkflowEditorContainer } from '../../features/workflow/components/WorkflowEditorContainer';
import Sidebar from '@/common/components/Sidebar';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import useSettingsStore from '@/store/settingsSlice';

const WorkflowEditorPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editorSize, setEditorSize] = useState({ width: 0, height: 0 });
  const editorContainerRef = useRef(null);
  const { theme } = useSettingsStore();

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

  return (
    <div className={`h-screen bg-background text-foreground flex ${theme}`}>
      <Sidebar
        expanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="p-8 space-y-6 h-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Workflow Editor</h1>
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
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div ref={editorContainerRef} className="relative h-full">
            <WorkflowEditorContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditorPage;