import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Edit, Trash2, Link } from 'lucide-react';

const GroupNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 bg-gradient-to-br from-green-100 to-green-50 ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-green-200 relative" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-green-800 font-bold flex items-center">
          <Users className="w-5 h-5 mr-2" />
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
          <Input className="node-input mb-2" placeholder="Group name" />
          <Button size="sm" className="node-button bg-green-500 hover:bg-green-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Members
          </Button>
        </CardContent>
      )}
      <div className="absolute top-0 right-0 p-1 bg-green-100/80 rounded-bl">
        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Link className="h-4 w-4" /></Button>
      </div>
    </Card>
  );
};

export default GroupNode;