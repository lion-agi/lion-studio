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
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${expanded ? '' : 'px-2'}`}
          onClick={onClick}
        >
          {React.cloneElement(icon, { className: `h-6 w-6 ${expanded ? 'mr-2' : ''}` })}
          {expanded && <span className="flex-grow">{label}</span>}
          {expanded && <PlusCircle className="ml-auto h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Add {label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default NodeTypeButton;