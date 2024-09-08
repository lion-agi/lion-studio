import React from 'react';
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { Search } from 'lucide-react';
import { DeploymentCard, NewDeploymentDialog, DeploymentTimeline } from '@/features/deployment/components';
import useDeployment from '@/features/deployment/hooks/useDeployment';

const Deployment = () => {
  const {
    activeTab,
    setActiveTab,
    isNewDeploymentDialogOpen,
    setIsNewDeploymentDialogOpen,
    searchTerm,
    setSearchTerm,
    environmentFilter,
    setEnvironmentFilter,
    filteredDeployments,
  } = useDeployment();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100">Deployments</h1>
          <div className="flex space-x-4 items-center">
            <Select value={environmentFilter} onValueChange={setEnvironmentFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Environments">All Environments</SelectItem>
                <SelectItem value="Production">Production</SelectItem>
                <SelectItem value="Staging">Staging</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full md:w-80">
              <Input
                type="text"
                placeholder="Search deployments..."
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
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">History</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredDeployments.map((deployment, index) => (
                <DeploymentCard key={index} {...deployment} />
              ))}
            </div>
            <Card className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle>Current Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={33} className="mb-2" />
                <p>Deploying Frontend App v1.2.4 to Production</p>
                <DeploymentTimeline />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Accordion type="single" collapsible className="w-full ">
              <AccordionItem value="item-1">
                <AccordionTrigger>Frontend App v1.2.3 (Production)</AccordionTrigger>
                <AccordionContent>
                  Deployed 2 hours ago. Status: Success. 
                  <Button variant="link">View Logs</Button>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Backend API v2.0.0 (Staging)</AccordionTrigger>
                <AccordionContent>
                  Deployed 1 day ago. Status: Success. 
                  <Button variant="link">View Logs</Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="w-full bg-gray-900 text-gray-100">
              <CardHeader>
                <CardTitle>Deployment Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="auto-deploy">Auto-deploy on merge to main</Label>
                  <input type="checkbox" id="auto-deploy" className="toggle" />
                </div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="approval-required">Require approval for production deploys</Label>
                  <input type="checkbox" id="approval-required" className="toggle" checked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => setIsNewDeploymentDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            New Deployment
          </Button>
        </div>

        <NewDeploymentDialog 
          isOpen={isNewDeploymentDialogOpen} 
          onClose={() => setIsNewDeploymentDialogOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Deployment;
