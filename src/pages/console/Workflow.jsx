import React from 'react';
import { WorkflowEditor } from '../../features/workflow/WorkflowEditor';
import { WorkflowSettingsProvider } from '../../features/workflow/WorkflowSettingsContext';

const Workflow = () => {
  return (
    <div className="h-screen">
      <WorkflowSettingsProvider>
        <WorkflowEditor />
      </WorkflowSettingsProvider>
    </div>
  );
};

export default Workflow;