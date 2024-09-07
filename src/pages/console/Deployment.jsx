import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { Badge } from "@/common/components/ui/badge";
import { Progress } from "@/common/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { AlertTriangle, CheckCircle2, Clock, XCircle, RefreshCw, Rocket, GitBranch, Server, Search } from 'lucide-react';


const DeploymentCard = ({ name, environment, status, lastDeployed, version }) => {
  const statusColors = {
    'Success': 'bg-green-500',
    'Failed': 'bg-red-500',
    'In Progress': 'bg-yellow-500',
    'Idle': 'bg-gray-500'
  };

  return (
    <Card className="bg-gray-800 hover:bg-card/90 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant="outline">{environment}</Badge>
        </div>
        <CardDescription>Version: {version}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
          <span>{status}</span>
        </div>
        <p className="text-sm text-muted-foreground">Last deployed: {lastDeployed}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">View Logs</Button>
        <Button variant="default" size="sm">Redeploy</Button>
      </CardFooter>
    </Card>
  );
};

const NewDeploymentDialog = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Deployment</DialogTitle>
        <DialogDescription>Set up a new deployment for your application.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="environment" className="text-right">Environment</Label>
          <Select>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="version" className="text-right">Version</Label>
          <Input id="version" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create Deployment</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const DeploymentTimeline = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Deployment Timeline</h3>
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="text-green-500" />
        <span>Build completed</span>
        <span className="text-sm text-muted-foreground">2 minutes ago</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="text-yellow-500" />
        <span>Tests running</span>
        <span className="text-sm text-muted-foreground">1 minute ago</span>
      </div>
      <div className="flex items-center space-x-2">
        <RefreshCw className="text-blue-500 animate-spin" />
        <span>Deploying to staging</span>
        <span className="text-sm text-muted-foreground">In progress</span>
      </div>
    </div>
  </div>
);


const Deployment = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isNewDeploymentDialogOpen, setIsNewDeploymentDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [environmentFilter, setEnvironmentFilter] = useState('All Environments');

  const deployments = [
    { name: 'Frontend App', environment: 'Production', status: 'Success', lastDeployed: '2 hours ago', version: 'v1.2.3' },
    { name: 'Backend API', environment: 'Staging', status: 'In Progress', lastDeployed: '15 minutes ago', version: 'v2.0.1' },
    { name: 'Database Migration', environment: 'Development', status: 'Failed', lastDeployed: '1 day ago', version: 'v0.8.5' },
  ];

  const filteredDeployments = deployments
    .filter(dep => dep.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(dep => environmentFilter === 'All Environments' || dep.environment === environmentFilter);

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