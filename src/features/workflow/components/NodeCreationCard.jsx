import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ChevronDown, Search, ChevronUp, Save, Upload, Settings } from 'lucide-react';
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { nodeCategories } from '@/common/components/nodes/nodeCategories';

const NodeCreationCard = ({ onAddNode, onExportJSON, onCreateFlow, onOpenSettings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="w-72 shadow-lg mt-4 ml-4">
      <CardHeader className="cursor-pointer flex flex-row items-center justify-between" onClick={toggleExpand}>
        <CardTitle>Workflow Tools</CardTitle>
        <Button variant="ghost" size="sm">
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
                        {node.icon && <node.icon className="h-4 w-4 mr-2" />}
                        <span className="ml-2">{node.label}</span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </ScrollArea>
            <div className="space-y-4 mt-4">
              <Button onClick={onExportJSON} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
              <Button onClick={onCreateFlow} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
              <Button onClick={onOpenSettings} className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default NodeCreationCard;