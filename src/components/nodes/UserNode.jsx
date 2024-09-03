import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from 'lucide-react';

const UserNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 from-primary/20 to-primary/10 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-primary/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-primary-foreground font-bold flex items-center">
          <User className="w-5 h-5 mr-2" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Input className="node-input" placeholder="User name" />
          <Button size="sm" className="node-button">
            <User className="w-4 h-4 mr-2" />
            Save
          </Button>
        </CardContent>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default UserNode;