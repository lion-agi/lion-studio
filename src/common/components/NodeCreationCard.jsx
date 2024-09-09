import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ChevronDown, Search, ChevronUp } from 'lucide-react';
import Draggable from 'react-draggable';
import { nodeCategories } from './nodes/nodeCategories';
import { ScrollArea } from "@/common/components/ui/scroll-area";

const NodeCreationCard = ({ onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const nodeRef = useRef(null);

  const filteredCategories = nodeCategories.map(category => ({
    category: category.name,
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="parent" handle=".drag-handle">
      <Card ref={nodeRef} className="w-64 absolute top-4 left-4 shadow-lg" style={{ maxHeight: 'calc(100% - 100px)', zIndex: 1000 }}>
        <CardHeader className="drag-handle cursor-move flex flex-row justify-between items-center">
          <CardTitle>Create Nodes</CardTitle>
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <Collapsible open={isExpanded}>
          <CollapsibleContent>
            <CardContent>
              <Input
                type="text"
                placeholder="Search nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4"
              />
              <ScrollArea className="h-[calc(100vh-300px)]">
                {filteredCategories.map(({ category, nodes }) => (
                  <Collapsible
                    key={category}
                    open={expandedCategories[category]}
                    onOpenChange={() => toggleCategory(category)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-muted rounded-md mb-2">
                      <span>{category}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories[category] ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {nodes.map((node) => (
                        <div
                          key={node.type}
                          className="flex items-center p-2 hover:bg-muted rounded-md cursor-move mb-2"
                          draggable
                          onDragStart={(e) => handleDragStart(e, node.type)}
                        >
                          {node.icon && <node.icon className="h-4 w-4 mr-2" />}
                          <span className="ml-2">{node.label}</span>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </ScrollArea>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </Draggable>
  );
};

export default NodeCreationCard;


// Path: src/common/components/NodeCreationCard.jsx