import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/common/components/ui/button";
import WorkflowSettingsPanel from './WorkflowSettingsPanel';

const WorkflowToolbar = ({ onExportJSON, onSaveLoad, onCreateFlow }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex space-x-2">
      <Button onClick={onExportJSON} size="sm">Export JSON</Button>
      <Button onClick={onSaveLoad} size="sm">Save/Load</Button>
      <Button onClick={onCreateFlow} size="sm">Create Flow</Button>
    </div>
    <WorkflowSettingsPanel />
  </div>
);

WorkflowToolbar.propTypes = {
  onExportJSON: PropTypes.func.isRequired,
  onSaveLoad: PropTypes.func.isRequired,
  onCreateFlow: PropTypes.func.isRequired,
};

export default WorkflowToolbar;