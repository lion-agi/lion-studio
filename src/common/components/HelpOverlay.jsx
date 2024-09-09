import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/common/components/ui/button"

const HelpOverlay = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Workflow Editor Quick Guide</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-semibold mb-2">Adding Nodes</h3>
            <p>Click on a node type in the sidebar to add it to the canvas. Drag nodes to reposition them.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">Creating Connections</h3>
            <p>Click and drag from a node's output handle to another node's input handle to create a connection.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">Editing Nodes</h3>
            <p>Click on a node to expand it and edit its properties. Use the toolbar that appears on hover for quick actions.</p>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <p>Use the minimap and controls in the bottom right to navigate the canvas. Scroll to zoom in/out.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpOverlay;


// Path: src/common/components/HelpOverlay.jsx