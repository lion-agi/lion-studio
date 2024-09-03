import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StickyNote, Save } from 'lucide-react';

const NoteNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 from-primary/20 to-primary/10 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-primary/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-primary-foreground font-bold flex items-center">
          <StickyNote className="w-5 h-5 mr-2" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Textarea className="node-input" placeholder="Write your note here" />
          <Button size="sm" className="node-button">
            <Save className="w-4 h-4 mr-2" />
            Save Note
          </Button>
        </CardContent>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default NoteNode;