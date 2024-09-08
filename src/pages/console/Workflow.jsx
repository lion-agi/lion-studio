import React from 'react';
import { WorkflowEditor } from '../../features/workflow/WorkflowEditor';
import { WorkflowSettingsProvider } from '../../features/workflow/WorkflowSettingsContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";

const Workflow = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100">Workflow</h1>
        </div>

        <Tabs defaultValue="editor" className="space-y-4">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="editor" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Editor</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <div className="h-screen bg-background text-foreground">
              <WorkflowSettingsProvider>
                <WorkflowEditor />
              </WorkflowSettingsProvider>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="h-screen bg-background text-foreground">
              <WorkflowSettingsProvider>
                <WorkflowEditor />
              </WorkflowSettingsProvider>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workflow;
