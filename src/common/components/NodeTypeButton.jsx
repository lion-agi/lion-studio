import React from 'react';
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";

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
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Add {label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default NodeTypeButton;


// Path: src/common/components/NodeTypeButton.jsx