import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";

const NodeCreationPanel = ({ onAddNode }) => (
  <div className="absolute top-4 right-4 z-10 bg-white p-4 rounded-lg shadow-md">
    <Button onClick={() => onAddNode({ type: 'default', position: { x: 100, y: 100 } })}>
      Add Node
    </Button>
  </div>
);

NodeCreationPanel.propTypes = {
  onAddNode: PropTypes.func.isRequired,
};

export default NodeCreationPanel;