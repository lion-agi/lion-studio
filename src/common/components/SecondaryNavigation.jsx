import React from 'react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ChevronRight, ChevronLeft } from 'lucide-react';

const SecondaryNavigation = ({ activeFeature, isExpanded, toggleExpanded }) => {
  const renderContent = () => {
    switch (activeFeature) {
      case 'workflows':
        return (
          <div className="space-y-4">
            <Button className="w-full">New Workflow</Button>
            <Button variant="outline" className="w-full">Import Workflow</Button>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Workflow Templates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="template1">Data Processing</SelectItem>
                <SelectItem value="template2">Customer Journey</SelectItem>
                <SelectItem value="template3">Content Generation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 'deployments':
        return (
          <div className="space-y-4">
            <Input placeholder="Deployment Name" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="prod">Production</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Version Number" />
            <Button className="w-full">Deploy</Button>
          </div>
        );
      case 'connections':
        return (
          <div className="space-y-4">
            <Button className="w-full">New Connection</Button>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="text-green-500">Connected</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API</span>
                <span className="text-red-500">Disconnected</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <span className="text-yellow-500">Pending</span>
              </div>
            </div>
          </div>
        );
      case 'prompts':
        return (
          <div className="space-y-4">
            <Input placeholder="New Prompt" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Prompt Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full">Save Prompt</Button>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">Customer Greeting</Button>
              <Button variant="ghost" className="w-full justify-start">Product Inquiry</Button>
              <Button variant="ghost" className="w-full justify-start">Technical Support</Button>
            </div>
          </div>
        );
      default:
        return <div>Select a feature to see options</div>;
    }
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={toggleExpanded}
      className="bg-sidebar w-64 border-r border-border transition-all duration-300 ease-in-out"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-2 transform translate-x-full"
        >
          {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4 capitalize">{activeFeature}</h2>
        {renderContent()}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SecondaryNavigation;