import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, Bot, User, Users, StickyNote, Play, Plus, Database, Workflow, Zap, MessageSquare } from 'lucide-react';
import Draggable from 'react-draggable';

const nodeCategories = [
  {
    name: 'Basic',
    nodes: [
      { type: 'assistant', icon: <Bot />, label: 'Assistant' },
      { type: 'user', icon: <User />, label: 'Human User' },
      { type: 'note', icon: <StickyNote />, label: 'Note' },
      { type: 'initializer', icon: <Play />, label: 'Start' },
    ]
  },
  {
    name: 'Advanced',
    nodes: [
      { type: 'database', icon: <Database />, label: 'Database' },
      { type: 'workflow', icon: <Workflow />, label: 'Workflow' },
      { type: 'api', icon: <Zap />, label: 'API Call' },
      { type: 'conversation', icon: <MessageSquare />, label: 'Conversation' },
      { type: 'moe', icon: <Users />, label: 'Mixture Of Experts' },
    ]
  }
];

const NodeCreationCard = ({ onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const filteredCategories = nodeCategories.map(category => ({
    ...category,
    nodes: category.nodes.filter(node =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.nodes.length > 0);

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Draggable bounds="parent" handle=".drag-handle">
      <Card className="w-64 absolute top-4 right-4 shadow-lg">
        <CardHeader className="drag-handle cursor-move">
          <CardTitle>Create Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {filteredCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={expandedCategories[category.name]}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-muted rounded-md mb-2">
                <span>{category.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories[category.name] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                {category.nodes.map((node) => (
                  <div
                    key={node.type}
                    className="flex items-center p-2 hover:bg-muted rounded-md cursor-move mb-2"
                    draggable
                    onDragStart={(e) => handleDragStart(e, node.type)}
                  >
                    {node.icon}
                    <span className="ml-2">{node.label}</span>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default NodeCreationCard;