import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { WorkflowEditor } from '../../features/workflow/WorkflowEditor';
import { WorkflowSettingsProvider } from '../../features/workflow/WorkflowSettingsContext';
import Sidebar from '@/common/components/Sidebar';
import SecondaryNavigation from '@/common/components/SecondaryNavigation';
import NodeCreationCard from '@/features/workflow/components/NodeCreationCard';
import SaveLoadDialog from '@/common/components/SaveLoadDialog';
import JSONModal from '@/common/components/JSONModal';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import { Card, CardContent } from "@/common/components/ui/card";
import { ScrollArea } from "@/common/components/ui/scroll-area";

const WorkflowEditorPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [secondarySidebarExpanded, setSecondarySidebarExpanded] = useState(true);
  const [activeFeature, setActiveFeature] = useState('workflows');
  const [activeTab, setActiveTab] = useState('editor');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const toggleSecondarySidebar = () => setSecondarySidebarExpanded(!secondarySidebarExpanded);

  const renderSettings = () => (
    <Card className="bg-gray-800 text-gray-100">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Workflow Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Auto-save</label>
            <select className="w-full bg-gray-700 text-gray-100 rounded-md">
              <option>Every 5 minutes</option>
              <option>Every 10 minutes</option>
              <option>Every 15 minutes</option>
              <option>Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Default Node Type</label>
            <select className="w-full bg-gray-700 text-gray-100 rounded-md">
              <option>Assistant</option>
              <option>User</option>
              <option>System</option>
              <option>Function</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Edge Style</label>
            <select className="w-full bg-gray-700 text-gray-100 rounded-md">
              <option>Bezier</option>
              <option>Straight</option>
              <option>Step</option>
              <option>Smoothstep</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Grid Size</label>
            <input type="range" min="10" max="50" className="w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen bg-background text-foreground flex">
      <Sidebar
        expanded={sidebarExpanded}
        toggleSidebar={toggleSidebar}
        activeFeature={activeFeature}
        setActiveFeature={setActiveFeature}
      />
      <SecondaryNavigation
        activeFeature={activeFeature}
        isExpanded={secondarySidebarExpanded}
        toggleExpanded={toggleSecondarySidebar}
      />
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="p-8 space-y-6 h-full flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Workflow Editor</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsInfoModalOpen(true)}
                className="text-gray-400 hover:text-gray-100"
              >
                <Info className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative w-full md:w-80">
              <Input
                type="text"
                placeholder="Search workflows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="editor" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Editor</TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Templates</TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">History</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="flex-grow overflow-hidden">
              <WorkflowSettingsProvider>
                <div className="relative h-full">
                  <WorkflowEditor />
                  <Card className="absolute top-4 left-4 z-10 w-64 bg-gray-800 text-gray-100">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      <CardContent>
                        <NodeCreationCard />
                      </CardContent>
                    </ScrollArea>
                  </Card>
                  <SaveLoadDialog
                    isOpen={showSaveLoadDialog}
                    onClose={() => setShowSaveLoadDialog(false)}
                    onSave={() => console.log('Save')}
                    onLoad={() => console.log('Load')}
                    graphData={{ nodes: [], edges: [] }}
                  />
                  <JSONModal
                    isOpen={showJSONModal}
                    onClose={() => setShowJSONModal(false)}
                    jsonData={jsonData}
                  />
                </div>
              </WorkflowSettingsProvider>
            </TabsContent>

            <TabsContent value="templates">
              <div className="text-gray-300">Workflow templates content goes here.</div>
            </TabsContent>

            <TabsContent value="history">
              <div className="text-gray-300">Workflow history content goes here.</div>
            </TabsContent>

            <TabsContent value="settings">
              <ScrollArea className="h-[calc(100vh-200px)]">
                {renderSettings()}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditorPage;