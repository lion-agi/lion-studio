import React, { useState } from 'react';
import { WorkflowEditor } from '../../features/workflow/WorkflowEditor';
import { WorkflowSettingsProvider } from '../../features/workflow/WorkflowSettingsContext';
import Sidebar from '@/common/components/Sidebar';
import SecondaryNavigation from '@/common/components/SecondaryNavigation';
import NodeCreationCard from '@/features/workflow/components/NodeCreationCard';

const Workflow = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [secondarySidebarExpanded, setSecondarySidebarExpanded] = useState(true);
  const [activeFeature, setActiveFeature] = useState('workflows');

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const toggleSecondarySidebar = () => setSecondarySidebarExpanded(!secondarySidebarExpanded);

  return (
    <div className="h-screen bg-background text-foreground flex">
      <Sidebar
        expanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />
      <SecondaryNavigation
        activeFeature={activeFeature}
        isExpanded={secondarySidebarExpanded}
        toggleExpanded={toggleSecondarySidebar}
      />
      <div className="flex-grow overflow-hidden relative">
        <WorkflowSettingsProvider>
          <WorkflowEditor />
        </WorkflowSettingsProvider>
        <NodeCreationCard className="absolute top-4 left-4 z-10" />
      </div>
    </div>
  );
};

export default Workflow;