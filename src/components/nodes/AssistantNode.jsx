import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Zap } from 'lucide-react';

const AssistantNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
          <Input className="node-input" placeholder="Assistant name" />
          <Button size="sm" className="node-button">
            <Zap className="w-4 h-4 mr-2" />
            Train
          </Button>
        </CardContent>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default AssistantNode;