import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, Bot, User, Users, StickyNote, Cog, Plus, Database, Workflow, Zap } from 'lucide-react';

const nodeCategories = [
  {
    name: 'Basic',
    nodes: [
      { type: 'assistant', icon: <Bot />, label: 'Assistant' },
      { type: 'user', icon: <User />, label: 'User Proxy' },
      { type: 'group', icon: <Users />, label: 'Group Chat' },
      { type: 'note', icon: <StickyNote />, label: 'Note' },
      { type: 'initializer', icon: <Cog />, label: 'Config' },
    ]
  },
  {
    name: 'Advanced',
    nodes: [
      { type: 'database', icon: <Database />, label: 'Database' },
      { type: 'workflow', icon: <Workflow />, label: 'Nested Workflow' },
      { type: 'api', icon: <Zap />, label: 'API Call' },
    ]
  }
];

const Sidebar = ({ onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredCategories = nodeCategories.map(category => ({
    ...category,
    nodes: category.nodes.filter(node =>
      node.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.nodes.length > 0);

  const handleDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="bg-gray-800 text-white p-4 overflow-y-auto max-h-[calc(100vh-64px)]">
      <Input
        type="text"
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 bg-gray-700 text-white"
      />
      {filteredCategories.map((category) => (
        <Collapsible
          key={category.name}
          open={expandedCategories[category.name]}
          onOpenChange={() => toggleCategory(category.name)}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-700 rounded-md mb-2">
            <span>{category.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories[category.name] ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            {category.nodes.map((node) => (
              <TooltipProvider key={node.type}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-move mb-2"
                      draggable
                      onDragStart={(e) => handleDragStart(e, node.type)}
                    >
                      {node.icon}
                      <span className="ml-2">{node.label}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Drag to add {node.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default Sidebar;