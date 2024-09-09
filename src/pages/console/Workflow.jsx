import React, { useState } from 'react';
import { WorkflowEditor } from '../../features/workflow/WorkflowEditor';
import { WorkflowSettingsProvider } from '../../features/workflow/WorkflowSettingsContext';
import Sidebar from '@/common/components/Sidebar';
import SecondaryNavigation from '@/common/components/SecondaryNavigation';

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
      <div className="flex-grow overflow-hidden">
        <WorkflowSettingsProvider>
          <WorkflowEditor />
        </WorkflowSettingsProvider>
      </div>
    </div>
  );
};

export default Workflow;