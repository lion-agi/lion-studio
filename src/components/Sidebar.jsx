import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight, ChevronDown, HelpCircle, Settings, FileJson, Save, PlusCircle, Bot, User, Users, StickyNote, Cog } from 'lucide-react';
import NodeTypeButton from './NodeTypeButton';

const Sidebar = ({ 
  sidebarExpanded, 
  toggleSidebar, 
  expandedCategories, 
  toggleCategory, 
  onHelpClick, 
  onSettingsClick, 
  onExportJSONClick, 
  onSaveLoadClick,
  onCreateAgenticFlow,
  addNode
}) => {
  return (
    <div className={`left-sidebar ${sidebarExpanded ? 'w-64' : 'w-16'} bg-gray-800 flex flex-col transition-all duration-300 border-r border-gray-700 fixed left-0 top-0 bottom-0 overflow-hidden`}>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="self-end mb-4 text-gray-400 hover:text-white">
        {sidebarExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </Button>
      <div className="flex-grow space-y-2 overflow-y-auto px-4">
        <SidebarButton icon={<HelpCircle className="h-5 w-5" />} label="Help" onClick={onHelpClick} expanded={sidebarExpanded} />
        <SidebarButton icon={<Settings className="h-5 w-5" />} label="Settings" onClick={onSettingsClick} expanded={sidebarExpanded} />
        <SidebarButton icon={<FileJson className="h-5 w-5" />} label="Export JSON" onClick={onExportJSONClick} expanded={sidebarExpanded} />
        <SidebarButton icon={<Save className="h-5 w-5" />} label="Save/Load" onClick={onSaveLoadClick} expanded={sidebarExpanded} />
        
        <div className="h-px bg-gray-700 my-4"></div>
        
        <SidebarButton icon={<PlusCircle className="h-5 w-5" />} label="New Agentic Flow" onClick={onCreateAgenticFlow} expanded={sidebarExpanded} />

        <div className="h-px bg-gray-700 my-4"></div>

        <NodeCategory
          name="Basic Nodes"
          icon={<PlusCircle className="h-5 w-5 mr-2" />}
          expanded={expandedCategories.basic}
          onToggle={() => toggleCategory('basic')}
          sidebarExpanded={sidebarExpanded}
        >
          <NodeTypeButton icon={<Bot className="h-4 w-4" />} label="Assistant" onClick={() => addNode('assistant')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<User className="h-4 w-4" />} label="User Proxy" onClick={() => addNode('user')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<Users className="h-4 w-4" />} label="Group Chat" onClick={() => addNode('group')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<StickyNote className="h-4 w-4" />} label="Note" onClick={() => addNode('note')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<Cog className="h-4 w-4" />} label="Config" onClick={() => addNode('initializer')} expanded={sidebarExpanded} />
        </NodeCategory>

        <NodeCategory
          name="Advanced Nodes"
          icon={<Bot className="h-5 w-5 mr-2" />}
          expanded={expandedCategories.advanced}
          onToggle={() => toggleCategory('advanced')}
          sidebarExpanded={sidebarExpanded}
        >
          {/* Add advanced nodes here */}
        </NodeCategory>

        <NodeCategory
          name="Extensions"
          icon={<PlusCircle className="h-5 w-5 mr-2" />}
          expanded={expandedCategories.extensions}
          onToggle={() => toggleCategory('extensions')}
          sidebarExpanded={sidebarExpanded}
        >
          {/* Add extension nodes here */}
        </NodeCategory>
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, label, onClick, expanded }) => (
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
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const NodeCategory = ({ name, icon, expanded, onToggle, sidebarExpanded, children }) => (
  <Collapsible open={expanded} onOpenChange={onToggle}>
    <CollapsibleTrigger className="flex items-center w-full p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white">
      {icon}
      {sidebarExpanded && <span className="flex-grow">{name}</span>}
      {sidebarExpanded && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />}
    </CollapsibleTrigger>
    <CollapsibleContent className="space-y-2 pl-4">
      {children}
    </CollapsibleContent>
  </Collapsible>
);

export default Sidebar;