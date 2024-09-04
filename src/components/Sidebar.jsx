import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight, ChevronDown, HelpCircle, Settings, FileJson, Save, Bot, User, Users, StickyNote, Cog, Plus } from 'lucide-react';

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
  onOpenNodeWizard
}) => {
  return (
    <div className={`sidebar ${sidebarExpanded ? 'w-64' : 'w-16'} bg-gray-800 flex flex-col transition-all duration-300 border-r border-gray-700 h-full overflow-hidden`}>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="self-end mb-4 text-gray-400 hover:text-white">
        {sidebarExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </Button>
      <div className="flex-grow space-y-2 overflow-y-auto px-4">
        <SidebarButton icon={<HelpCircle className="h-6 w-6" />} label="Help" onClick={onHelpClick} expanded={sidebarExpanded} />
        <SidebarButton icon={<Settings className="h-6 w-6" />} label="Settings" onClick={onSettingsClick} expanded={sidebarExpanded} />
        <SidebarButton icon={<FileJson className="h-6 w-6" />} label="Export JSON" onClick={onExportJSONClick} expanded={sidebarExpanded} />
        <SidebarButton icon={<Save className="h-6 w-6" />} label="Save/Load" onClick={onSaveLoadClick} expanded={sidebarExpanded} />
        
        <div className="h-px bg-gray-700 my-4"></div>
        
        <SidebarButton icon={<Plus className="h-6 w-6" />} label="New Agentic Flow" onClick={onCreateAgenticFlow} expanded={sidebarExpanded} />

        <div className="h-px bg-gray-700 my-4"></div>

        <NodeCategory
          name="Basic Nodes"
          icon={<Plus className="h-6 w-6 mr-2" />}
          expanded={expandedCategories.basic}
          onToggle={() => toggleCategory('basic')}
          sidebarExpanded={sidebarExpanded}
        >
          <NodeTypeButton icon={<Bot className="h-6 w-6" />} label="Assistant" onClick={() => onOpenNodeWizard('assistant')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<User className="h-6 w-6" />} label="User Proxy" onClick={() => onOpenNodeWizard('user')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<Users className="h-6 w-6" />} label="Group Chat" onClick={() => onOpenNodeWizard('group')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<StickyNote className="h-6 w-6" />} label="Note" onClick={() => onOpenNodeWizard('note')} expanded={sidebarExpanded} />
          <NodeTypeButton icon={<Cog className="h-6 w-6" />} label="Config" onClick={() => onOpenNodeWizard('initializer')} expanded={sidebarExpanded} />
        </NodeCategory>

        <NodeCategory
          name="Advanced Nodes"
          icon={<Bot className="h-6 w-6 mr-2" />}
          expanded={expandedCategories.advanced}
          onToggle={() => toggleCategory('advanced')}
          sidebarExpanded={sidebarExpanded}
        >
          {/* Add advanced nodes here */}
        </NodeCategory>

        <NodeCategory
          name="Extensions"
          icon={<Plus className="h-6 w-6 mr-2" />}
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
          className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${expanded ? '' : 'px-2'}`}
          onClick={onClick}
        >
          {React.cloneElement(icon, { className: `h-6 w-6 ${expanded ? 'mr-2' : ''}` })}
          {expanded && <span>{label}</span>}
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
    <CollapsibleTrigger className={`flex items-center w-full p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white ${sidebarExpanded ? '' : 'justify-center'}`}>
      {React.cloneElement(icon, { className: `h-6 w-6 ${sidebarExpanded ? 'mr-2' : ''}` })}
      {sidebarExpanded && <span className="flex-grow">{name}</span>}
      {sidebarExpanded && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />}
    </CollapsibleTrigger>
    <CollapsibleContent className={`space-y-2 ${sidebarExpanded ? 'pl-4' : 'pl-0'}`}>
      {children}
    </CollapsibleContent>
  </Collapsible>
);

const NodeTypeButton = ({ icon, label, onClick, expanded }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-grow justify-start text-gray-300 hover:text-white hover:bg-gray-700 ${expanded ? '' : 'px-2'}`}
          >
            {React.cloneElement(icon, { className: `h-6 w-6 ${expanded ? 'mr-2' : ''}` })}
            {expanded && <span className="flex-grow">{label}</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Add {label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Sidebar;