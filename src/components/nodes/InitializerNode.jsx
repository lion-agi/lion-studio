import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Cog, Save } from 'lucide-react';

const InitializerNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 from-muted/20 to-muted/10 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-muted/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-muted-foreground font-bold flex items-center">
          <Cog className="w-5 h-5 mr-2" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Textarea className="node-input" placeholder="Initialize the flow" />
          <Button size="sm" className="node-button">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </CardContent>
      )}
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default InitializerNode;