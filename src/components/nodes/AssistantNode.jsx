import React, { useState, useEffect } from 'react';
import { Handle, Position, useStoreApi } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Zap, Edit, Trash2, Copy } from 'lucide-react';

const AssistantNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const store = useStoreApi();

  useEffect(() => {
    const unsubscribe = store.subscribe(
      state => state.nodeInternals.get(data.id)?.selected,
      selected => {
        setShowButtons(selected);
      }
    );
    return () => unsubscribe();
  }, [data.id, store]);

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit node:', data.id);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete node:', data.id);
  };

  const handleDuplicate = () => {
    // Implement duplicate functionality
    console.log('Duplicate node:', data.id);
  };

  return (
    <Card className={`node-card w-64 from-accent/20 to-accent/10 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-accent/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-accent-foreground font-bold flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Input className="node-input mb-2" placeholder="Assistant name" value={data.name || ''} readOnly />
          <Textarea className="node-input mb-2" placeholder="Description" value={data.description || ''} readOnly />
          <Input className="node-input mb-2" placeholder="Model" value={data.model || ''} readOnly />
          <Input className="node-input mb-2" placeholder="Temperature" value={data.temperature || ''} readOnly />
          <Input className="node-input mb-2" placeholder="Max Tokens" value={data.maxTokens || ''} readOnly />
          <Button size="sm" className="node-button">
            <Zap className="w-4 h-4 mr-2" />
            Train
          </Button>
        </CardContent>
      )}
      {showButtons && (
        <div className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl">
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDuplicate}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default AssistantNode;