import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ScrollArea } from "@/common/components/ui/scroll-area";
import { ChevronDown, Search, ChevronUp, Settings, Save, Upload } from 'lucide-react';
import { nodeCategories } from '@/common/components/nodes/nodeCategories';

const NodeCreationCard = ({ onAddNode, onSave, onLoad }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('nodes');

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
    <Card className="absolute top-4 left-4 z-50 w-72 bg-gray-800 text-gray-100 shadow-lg">
      <CardHeader className="cursor-move p-2 bg-gray-700">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Workflow Tools</CardTitle>
          <Button variant="ghost" size="sm" onClick={toggleExpand}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nodes">Nodes</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="saveload">Save/Load</TabsTrigger>
            </TabsList>
            <TabsContent value="nodes">
              <CardContent className="p-2">
                <Input
                  type="text"
                  placeholder="Search nodes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {filteredCategories.map((category) => (
                    <Collapsible
                      key={category.name}
                      open={expandedCategories[category.name]}
                      onOpenChange={() => toggleCategory(category.name)}
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-700 rounded-md mb-1">
                        <span>{category.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories[category.name] ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {category.nodes.map((node) => (
                          <div
                            key={node.type}
                            className="flex items-center p-2 hover:bg-gray-700 rounded-md cursor-move mb-1"
                            draggable
                            onDragStart={(e) => handleDragStart(e, node.type)}
                          >
                            {node.icon && <node.icon className="h-4 w-4 mr-2" />}
                            <span className="text-sm">{node.label}</span>
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </ScrollArea>
              </CardContent>
            </TabsContent>
            <TabsContent value="settings">
              <CardContent className="p-2">
                <h3 className="text-sm font-medium mb-2">Workflow Settings</h3>
                {/* Add workflow settings here */}
              </CardContent>
            </TabsContent>
            <TabsContent value="saveload">
              <CardContent className="p-2 space-y-2">
                <Button onClick={onSave} className="w-full flex items-center justify-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Workflow
                </Button>
                <Button onClick={onLoad} className="w-full flex items-center justify-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Load Workflow
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default NodeCreationCard;