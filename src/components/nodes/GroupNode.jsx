import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus } from 'lucide-react';

const GroupNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 from-destructive/20 to-destructive/10 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-destructive/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-destructive-foreground font-bold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Input className="node-input" placeholder="Group name" />
          <Button size="sm" className="node-button">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Members
          </Button>
        </CardContent>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default GroupNode;