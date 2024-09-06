import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/common/components/ui/button";

const WorkflowToolbar = ({ onExportJSON, onSaveLoad, onCreateFlow }) => (
  <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md">
    <Button onClick={onExportJSON}>Export JSON</Button>
    <Button onClick={onSaveLoad}>Save/Load</Button>
    <Button onClick={onCreateFlow}>Create Flow</Button>
  </div>
);

WorkflowToolbar.propTypes = {
  onExportJSON: PropTypes.func.isRequired,
  onSaveLoad: PropTypes.func.isRequired,
  onCreateFlow: PropTypes.func.isRequired,
};

export default WorkflowToolbar;