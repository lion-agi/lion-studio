import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, Link, Bot, Save } from 'lucide-react';

const AgentNode = ({ data, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={`node-card w-64 from-secondary/20 to-secondary/10 relative backdrop-blur-sm ${selected ? 'selected' : ''}`}>
      <CardHeader className="node-header bg-secondary/30" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-secondary-foreground font-bold flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          {data.label}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content">
          <Input className="node-input" placeholder="Agent name" />
          <Textarea className="node-input" placeholder="Description" />
          <Textarea className="node-input" placeholder="System Message" />
          <Select>
            <SelectTrigger className="w-full bg-transparent border-b border-muted-foreground">
              <SelectValue placeholder="Human Input Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="always">Always</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
          <Input className="node-input" type="number" placeholder="Max Consecutive Auto-Replies" />
          <Textarea className="node-input" placeholder="Termination Message" />
          <Button size="sm" className="node-button">
            <Save className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </CardContent>
      )}
      <div className="node-toolbar">
        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Link className="h-4 w-4" /></Button>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
};

export default AgentNode;