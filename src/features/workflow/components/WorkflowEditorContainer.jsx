import React from 'react';
import { WorkflowSettingsProvider } from './WorkflowSettingsContext';
import WorkflowEditor from './WorkflowEditor';

const WorkflowEditorContainer = () => {
  return (
    <WorkflowSettingsProvider>
      <WorkflowEditor />
    </WorkflowSettingsProvider>
  );
};

export default WorkflowEditorContainer;

// Path: src/features/workflow/components/WorkflowEditorContainer.jsx