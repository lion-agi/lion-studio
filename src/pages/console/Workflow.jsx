import React, { useState, useCallback } from 'react';
import WorkflowEditor from '../../components/WorkflowEditor';
import WorkflowSidebar from '../../components/WorkflowSidebar';
import ConsolePageHeader from '../../components/header/ConsolePageHeader';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Workflow = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('main');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleExportJSON = useCallback(() => {
    // Implement JSON export logic
  }, []);

  const handleSaveLoad = useCallback(() => {
    // Implement save/load logic
  }, []);

  const handleCreateAgenticFlow = useCallback(() => {
    // Implement create new flow logic
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ConsolePageHeader 
        title="Workflow Editor"
        activeView={activeView}
        onViewChange={setActiveView}
        onExportJSON={handleExportJSON}
        onSaveLoad={handleSaveLoad}
        onCreateNew={handleCreateAgenticFlow}
      />
      <div className="flex flex-grow overflow-hidden">
        <WorkflowSidebar isOpen={isSidebarOpen} />
        <div className="flex-grow flex flex-col relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-0 z-10"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
          <WorkflowEditor />
        </div>
      </div>
    </div>
  );
};

export default Workflow;