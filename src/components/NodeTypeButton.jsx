import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as Icons from 'lucide-react';

const NodeTypeButton = ({ icon, label, expanded }) => {
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${expanded ? '' : 'px-2'}`}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/reactflow', label);
              e.dataTransfer.effectAllowed = 'move';
            }}
          >
            <IconComponent className={`h-5 w-5 ${expanded ? 'mr-2' : ''}`} />
            {expanded && <span>{label}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NodeTypeButton;