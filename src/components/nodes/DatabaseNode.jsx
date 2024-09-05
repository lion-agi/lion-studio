import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Database, Save, Edit, Trash2, Link } from 'lucide-react';

const DatabaseNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`node-card w-64 bg-gradient-to-br from-purple-400/20 to-purple-300/10 backdrop-blur-sm ${selected ? 'selected' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header relative" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-accent-foreground font-bold flex items-center">
          <Database className="w-6 h-6 mr-2" />
          {data.label}
        </CardTitle>
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '50%', transform: 'translateY(-50%)', left: '-6px' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '50%', transform: 'translateY(-50%)', right: '-6px' }}
        />
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Textarea className="node-input mb-2" placeholder="Database configuration" />
          <Button size="sm" className="node-button bg-purple-500 hover:bg-purple-600">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </CardContent>
      )}
      {(selected || isHovered) && (
        <div className="absolute top-0 right-0 p-1 bg-purple-100/50 rounded-bl">
          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Link className="h-4 w-4" /></Button>
        </div>
      )}
    </Card>
  );
};

export default DatabaseNode;