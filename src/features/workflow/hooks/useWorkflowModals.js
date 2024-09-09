import { useState } from 'react';

export const useWorkflowModals = () => {
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  return {
    showJSONModal,
    showSaveLoadDialog,
    setShowJSONModal,
    setShowSaveLoadDialog,
    jsonData,
    setJsonData,
  };
};

// Path: src/features/workflow/hooks/useWorkflowModals.js