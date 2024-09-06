import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const NodeCreationPanel = ({ onAddNode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`absolute top-0 ${isExpanded ? 'left-0' : '-left-64'} h-full transition-all duration-300 ease-in-out`}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="absolute top-2 -right-8 bg-background/50">
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="w-64 bg-background/80 backdrop-blur-sm p-4 h-full overflow-y-auto">
          {Object.entries(nodeCategories).map(([category, nodes]) => (
            <Collapsible key={category}>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <span className="font-semibold">{category}</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4 space-y-2">
                {nodes.map((node) => (
                  <Button 
                    key={node.type} 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => onAddNode(node)}
                  >
                    <node.icon className="mr-2 h-4 w-4" />
                    {node.label}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default NodeCreationPanel;