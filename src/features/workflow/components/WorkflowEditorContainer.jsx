import React from 'react';
import { WorkflowSettingsProvider } from './WorkflowSettingsContext';
import WorkflowEditor from './WorkflowEditor';

export const WorkflowEditorContainer = () => {
  return (
    <WorkflowSettingsProvider>
      <WorkflowEditor />
    </WorkflowSettingsProvider>
  );
};

export default WorkflowEditorContainer;