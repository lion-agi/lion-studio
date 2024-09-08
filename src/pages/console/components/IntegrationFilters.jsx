import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Search } from 'lucide-react';

const IntegrationFilters = ({ activeTab, setActiveTab, searchTerm, setSearchTerm, typeFilter, setTypeFilter }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100">Integrations</h1>
        <div className="flex space-x-4 items-center">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Cloud">Cloud Storage</SelectItem>
              <SelectItem value="API">APIs</SelectItem>
              <SelectItem value="AI">AI Models</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All</TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Databases</TabsTrigger>
          <TabsTrigger value="cloud" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Cloud Storage</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">APIs</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">AI Models</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default IntegrationFilters;