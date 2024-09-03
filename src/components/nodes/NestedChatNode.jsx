import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const NestedChatNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 from-secondary/20 to-secondary/10 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-secondary/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-secondary-foreground font-bold">{data.label}</CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Input className="node-input" placeholder="Chat name" />
          <Textarea className="node-input" placeholder="Nested chat configuration" />
          <Button size="sm" className="node-button w-full">Configure</Button>
        </CardContent>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default NestedChatNode;