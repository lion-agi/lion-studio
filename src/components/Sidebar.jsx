import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import NodeTypeButton from './NodeTypeButton';

const nodeCategories = [
  {
    name: 'LOGIC OPERATORS',
    nodes: [
      { name: 'AND', icon: 'AndIcon' },
      { name: 'OR', icon: 'OrIcon' },
      { name: 'NOT', icon: 'NotIcon' },
    ],
  },
  {
    name: 'ORCHESTRATORS',
    nodes: [
      { name: 'Sequence', icon: 'SequenceIcon' },
      { name: 'Parallel', icon: 'ParallelIcon' },
      { name: 'Loop', icon: 'LoopIcon' },
    ],
  },
  {
    name: 'AGENTS',
    nodes: [
      { name: 'Assistant', icon: 'AssistantIcon' },
      { name: 'User', icon: 'UserIcon' },
      { name: 'Group', icon: 'GroupIcon' },
    ],
  },
  {
    name: 'TOOLS',
    nodes: [
      { name: 'API Call', icon: 'ApiIcon' },
      { name: 'Database Query', icon: 'DatabaseIcon' },
      { name: 'File Operation', icon: 'FileIcon' },
    ],
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredCategories = nodeCategories.map(category => ({
    ...category,
    nodes: category.nodes.filter(node =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.nodes.length > 0);

  return (
    <div className={`bg-gray-800 text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="flex items-center justify-between p-4">
        {isExpanded && (
          <Input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-700 text-white placeholder-gray-400"
          />
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <Accordion type="multiple" className="w-full">
          {filteredCategories.map((category) => (
            <AccordionItem value={category.name} key={category.name}>
              <AccordionTrigger className="px-4 py-2 text-sm font-semibold">
                {category.name}
              </AccordionTrigger>
              <AccordionContent>
                {category.nodes.map((node) => (
                  <NodeTypeButton
                    key={node.name}
                    icon={node.icon}
                    label={node.name}
                    expanded={isExpanded}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;