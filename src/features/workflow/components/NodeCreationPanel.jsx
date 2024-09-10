import React, { useState, useCallback } from 'react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ChevronDown, Search } from 'lucide-react';
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { nodeCategories } from '@/common/components/nodes/nodeCategories';

const NodeCreationPanel = () => {
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
    <div className="space-y-4 mb-4">
      <Input
        type="text"
        placeholder="Search nodes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <ScrollArea 
        className="h-[calc(50vh-100px)] pr-4" 
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent'
        }}
      >
        <div className="space-y-2">
          {filteredCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={expandedCategories[category.name]}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-700 rounded-md mb-2 hover:bg-gray-600 transition-colors duration-200">
                <span>{category.name}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories[category.name] ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1 ml-2">
                  {category.nodes.map((node) => (
                    <div
                      key={node.type}
                      className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-move transition-colors duration-200"
                      draggable
                      onDragStart={(e) => handleDragStart(e, node.type)}
                    >
                      {node.icon && <node.icon className="h-4 w-4 mr-2 text-gray-400" />}
                      <span className="text-sm">{node.label}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NodeCreationPanel;
// Path: src/features/workflow/components/NodeCreationPanel.jsx