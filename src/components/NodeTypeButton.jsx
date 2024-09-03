import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle } from 'lucide-react';

const NodeTypeButton = ({ icon, label, onClick, expanded }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
          onClick={onClick}
        >
          {icon}
          {expanded && <span className="ml-2">{label}</span>}
          <PlusCircle className="ml-auto h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Add {label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default NodeTypeButton;