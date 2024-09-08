import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Badge } from "@/common/components/ui/badge";
import { Switch } from "@/common/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Textarea } from "@/common/components/ui/textarea";
import { CheckCircle2, XCircle, Database, Cloud, FileText, Link as LinkIcon, Brain, Search } from 'lucide-react';
import { useIntegrations, useAddIntegration, useUpdateIntegration, useDeleteIntegration, useToggleIntegrationStatus } from '@/integrations/supabase/hooks/integrations';
import { useToast } from "@/common/components/ui/use-toast";

const IntegrationCard = ({ integration, onConfigure, onToggle }) => (
  <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-semibold text-gray-100">{integration.name}</CardTitle>
      {integration.type === 'database' && <Database className="h-5 w-5 text-gray-400" />}
      {integration.type === 'cloud' && <Cloud className="h-5 w-5 text-gray-400" />}
      {integration.type === 'api' && <LinkIcon className="h-5 w-5 text-gray-400" />}
      {integration.type === 'ai' && <Brain className="h-5 w-5 text-gray-400" />}
    </CardHeader>
    <CardContent>
      <Badge 
        variant={integration.status === 'Connected' ? 'success' : 'secondary'}
        className={integration.status === 'Connected' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}
      >
        {integration.status}
      </Badge>
      <p className="text-sm text-gray-400 mt-2">{integration.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm" onClick={() => onConfigure(integration)}>Configure</Button>
      <Switch 
        checked={integration.status === 'Connected'} 
        onCheckedChange={() => onToggle(integration)}
        className={integration.status === 'Connected' ? 'bg-green-500' : 'bg-gray-500'}
      />
    </CardFooter>
  </Card>
);

const ConfigureIntegrationModal = ({ isOpen, onClose, integration, onSave }) => {
  const [formData, setFormData] = useState(integration || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl">Configure Integration</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update the details for your integration. Ensure all required fields are filled.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" name="name" value={formData.name || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select name="type" value={formData.type || ''} onValueChange={(value) => handleInputChange({ target: { name: 'type', value } })}>
              <SelectTrigger className="col-span-3 bg-gray-700 text-gray-100">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="cloud">Cloud Storage</SelectItem>
                <SelectItem value="ai">AI Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              className="col-span-3 bg-gray-700 text-gray-100"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="config" className="text-right">Configuration</Label>
            <Textarea
              id="config"
              name="config"
              value={JSON.stringify(formData.config || {}, null, 2)}
              onChange={(e) => handleInputChange({ target: { name: 'config', value: JSON.parse(e.target.value) } })}
              className="col-span-3 bg-gray-700 text-gray-100"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Integrations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isNewIntegrationDialogOpen, setIsNewIntegrationDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);

  const { data: integrations, isLoading, error } = useIntegrations();
  const addIntegration = useAddIntegration();
  const updateIntegration = useUpdateIntegration();
  const deleteIntegration = useDeleteIntegration();
  const toggleIntegrationStatus = useToggleIntegrationStatus();
  const { toast } = useToast();

  const filteredIntegrations = integrations
    ?.filter(conn => activeTab === 'all' || conn.type === activeTab)
    .filter(conn => conn.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(conn => typeFilter === 'All Types' || conn.type === typeFilter.toLowerCase())
    .sort((a, b) => {
      if (a.status === 'Connected' && b.status !== 'Connected') return -1;
      if (a.status !== 'Connected' && b.status === 'Connected') return 1;
      return 0;
    }) || [];

  const handleConfigure = (integration) => {
    setSelectedIntegration(integration);
    setIsConfigureModalOpen(true);
  };

  const handleToggle = async (integration) => {
    try {
      const newStatus = integration.status === 'Connected' ? 'Disconnected' : 'Connected';
      await toggleIntegrationStatus.mutateAsync({
        id: integration.id,
        status: newStatus
      });
      toast({
        title: "Status Updated",
        description: `Integration ${integration.name} is now ${newStatus}`,
      });
    } catch (error) {
      console.error('Error toggling integration status:', error);
      toast({
        title: "Error",
        description: "Failed to update integration status",
        variant: "destructive",
      });
    }
  };

  const handleSaveIntegration = async (updatedIntegration) => {
    try {
      if (updatedIntegration.id) {
        await updateIntegration.mutateAsync(updatedIntegration);
        toast({
          title: "Integration Updated",
          description: "The integration has been successfully updated.",
        });
      } else {
        await addIntegration.mutateAsync(updatedIntegration);
        toast({
          title: "Integration Added",
          description: "A new integration has been successfully added.",
        });
      }
      setIsConfigureModalOpen(false);
      setSelectedIntegration(null);
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        title: "Error",
        description: "Failed to save integration. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading integrations...</div>;
  if (error) return <div className="text-red-500">Error loading integrations: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8 space-y-8">
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

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard 
                  key={integration.id} 
                  integration={integration} 
                  onConfigure={handleConfigure}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => {
              setSelectedIntegration(null);
              setIsConfigureModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add New Integration
          </Button>
        </div>

        <ConfigureIntegrationModal 
          isOpen={isConfigureModalOpen}
          onClose={() => {
            setIsConfigureModalOpen(false);
            setSelectedIntegration(null);
          }}
          integration={selectedIntegration}
          onSave={handleSaveIntegration}
        />
      </div>
    </div>
  );
};

export default Integrations;