import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PlusCircle, User, Bot, Users, Play, MessageSquare, StickyNote, ChevronRight, HelpCircle, Settings, ChevronDown, Cog, Save, FileJson, Menu, ChevronLeft } from 'lucide-react';

import UserNode from './nodes/UserNode';
import AgentNode from './nodes/AgentNode';
import AssistantNode from './nodes/AssistantNode';
import GroupNode from './nodes/GroupNode';
import InitializerNode from './nodes/InitializerNode';
import NestedChatNode from './nodes/NestedChatNode';
import NoteNode from './nodes/NoteNode';
import HelpOverlay from './HelpOverlay';
import SettingsModal from './SettingsModal';
import JSONModal from './JSONModal';
import SaveLoadDialog from './SaveLoadDialog';
import AgenticFlowWizard from './AgenticFlowWizard';

const nodeTypes = {
  user: UserNode,
  agent: AgentNode,
  assistant: AssistantNode,
  group: GroupNode,
  initializer: InitializerNode,
  nestedChat: NestedChatNode,
  note: NoteNode,
};

const WorkflowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [showHelpOverlay, setShowHelpOverlay] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    basic: true,
    advanced: false,
    extensions: false,
  });

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#6366F1', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#6366F1' },
    }, eds));
  }, [setEdges]);

  const addNode = useCallback((type) => {
    const newNode = {
      id: `${type}-${nodes.length + 1}`,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const nodeColor = (node) => {
    switch (node.type) {
      case 'user':
        return '#3B82F6';
      case 'agent':
        return '#10B981';
      case 'assistant':
        return '#F59E0B';
      case 'group':
        return '#8B5CF6';
      case 'initializer':
        return '#EF4444';
      case 'nestedChat':
        return '#EC4899';
      case 'note':
        return '#6366F1';
      default:
        return '#64748B';
    }
  };

  const handleExportJSON = () => {
    const graphData = { nodes, edges };
    setShowJSONModal(true);
  };

  const handleSaveLoad = () => {
    setShowSaveLoadDialog(true);
  };

  const handleCreateAgenticFlow = (flowConfig) => {
    console.log('Creating new flow:', flowConfig);
  };

  const renderSidebarButton = (icon, label, onClick) => (
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
            {sidebarExpanded && <span className="ml-2">{label}</span>}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const renderNodeTypeButton = (icon, label, type) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => addNode(type)}
          >
            {icon}
            {sidebarExpanded && <span className="ml-2">{label}</span>}
            <PlusCircle className="ml-auto h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Add {label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <div className={`left-sidebar ${sidebarExpanded ? 'w-64' : 'w-16'} bg-gray-800 flex flex-col transition-all duration-300 border-r border-gray-700 fixed left-0 top-0 bottom-0 overflow-hidden`}>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="self-end mb-4 text-gray-400 hover:text-white">
          {sidebarExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </Button>
        <div className="flex-grow space-y-2 overflow-y-auto px-4">
          {renderSidebarButton(<HelpCircle className="h-5 w-5" />, "Help", () => setShowHelpOverlay(true))}
          {renderSidebarButton(<Settings className="h-5 w-5" />, "Settings", () => setShowSettingsModal(true))}
          {renderSidebarButton(<FileJson className="h-5 w-5" />, "Export JSON", handleExportJSON)}
          {renderSidebarButton(<Save className="h-5 w-5" />, "Save/Load", handleSaveLoad)}
          
          <div className="h-px bg-gray-700 my-4"></div>
          
          <AgenticFlowWizard
            onCreateFlow={handleCreateAgenticFlow}
            onClearDiagram={() => {
              setNodes([]);
              setEdges([]);
            }}
            onSaveFlow={handleExportJSON}
          />

          <div className="h-px bg-gray-700 my-4"></div>

          <Collapsible open={expandedCategories.basic} onOpenChange={() => toggleCategory('basic')}>
            <CollapsibleTrigger className="flex items-center w-full p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white">
              <PlusCircle className="h-5 w-5 mr-2" />
              {sidebarExpanded && <span className="flex-grow">Basic Nodes</span>}
              {sidebarExpanded && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories.basic ? 'rotate-180' : ''}`} />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pl-4">
              {renderNodeTypeButton(<Bot className="h-4 w-4" />, "Assistant", "assistant")}
              {renderNodeTypeButton(<User className="h-4 w-4" />, "User Proxy", "user")}
              {renderNodeTypeButton(<Users className="h-4 w-4" />, "Group Chat", "group")}
              {renderNodeTypeButton(<StickyNote className="h-4 w-4" />, "Note", "note")}
              {renderNodeTypeButton(<Cog className="h-4 w-4" />, "Config", "initializer")}
            </CollapsibleContent>
          </Collapsible>
          <Collapsible open={expandedCategories.advanced} onOpenChange={() => toggleCategory('advanced')}>
            <CollapsibleTrigger className="flex items-center w-full p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white">
              <Bot className="h-5 w-5 mr-2" />
              {sidebarExpanded && <span className="flex-grow">Advanced Nodes</span>}
              {sidebarExpanded && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories.advanced ? 'rotate-180' : ''}`} />}
            </CollapsibleTrigger>
          </Collapsible>
          <Collapsible open={expandedCategories.extensions} onOpenChange={() => toggleCategory('extensions')}>
            <CollapsibleTrigger className="flex items-center w-full p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white">
              <PlusCircle className="h-5 w-5 mr-2" />
              {sidebarExpanded && <span className="flex-grow">Extensions</span>}
              {sidebarExpanded && <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expandedCategories.extensions ? 'rotate-180' : ''}`} />}
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      <div className={`flex-grow transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-16'}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Controls />
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
          <Background color="#4B5563" gap={16} />
        </ReactFlow>
      </div>

      {showHelpOverlay && <HelpOverlay onClose={() => setShowHelpOverlay(false)} />}
      {showSettingsModal && <SettingsModal onClose={() => setShowSettingsModal(false)} />}
      {showJSONModal && <JSONModal isOpen={showJSONModal} onClose={() => setShowJSONModal(false)} jsonData={{ nodes, edges }} />}
      {showSaveLoadDialog && (
        <SaveLoadDialog
          isOpen={showSaveLoadDialog}
          onClose={() => setShowSaveLoadDialog(false)}
          onSave={(savedGraph) => {
            console.log('Saving graph:', savedGraph);
            setShowSaveLoadDialog(false);
          }}
          onLoad={(loadedGraphData) => {
            setNodes(loadedGraphData.nodes);
            setEdges(loadedGraphData.edges);
            setShowSaveLoadDialog(false);
          }}
          graphData={{ nodes, edges }}
        />
      )}
    </div>
  );
};

export default WorkflowEditor;