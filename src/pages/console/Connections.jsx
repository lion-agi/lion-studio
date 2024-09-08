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

const ConnectionCard = ({ connection, onConfigure, onToggle }) => (
  <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-semibold text-gray-100">{connection.name}</CardTitle>
      <connection.icon className="h-5 w-5 text-gray-400" />
    </CardHeader>
    <CardContent>
      <Badge 
        variant={connection.status === 'Connected' ? 'success' : 'secondary'}
        className={connection.status === 'Connected' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}
      >
        {connection.status}
      </Badge>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm" onClick={() => onConfigure(connection)}>Configure</Button>
      <Switch 
        checked={connection.status === 'Connected'} 
        onCheckedChange={() => onToggle(connection)}
        className={connection.status === 'Connected' ? 'bg-green-500' : 'bg-gray-500'}
      />
    </CardFooter>
  </Card>
);

const ConfigureConnectionModal = ({ isOpen, onClose, connection, onSave }) => {
  const [formData, setFormData] = useState(connection || {});

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
          <DialogTitle className="text-2xl">Configure Connection</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update the details for your connection. Ensure all required fields are filled.
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
          {formData.type === 'database' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="host" className="text-right">Host</Label>
                <Input id="host" name="host" value={formData.host || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">Port</Label>
                <Input id="port" name="port" value={formData.port || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="database" className="text-right">Database</Label>
                <Input id="database" name="database" value={formData.database || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
            </>
          )}
          {formData.type === 'api' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">API Key</Label>
                <Input id="apiKey" name="apiKey" value={formData.apiKey || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endpoint" className="text-right">Endpoint URL</Label>
                <Input id="endpoint" name="endpoint" value={formData.endpoint || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
            </>
          )}
          {formData.type === 'cloud' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="accessKey" className="text-right">Access Key</Label>
                <Input id="accessKey" name="accessKey" value={formData.accessKey || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="secretKey" className="text-right">Secret Key</Label>
                <Input id="secretKey" name="secretKey" type="password" value={formData.secretKey || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region" className="text-right">Region</Label>
                <Input id="region" name="region" value={formData.region || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
            </>
          )}
          {formData.type === 'ai' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="modelName" className="text-right">Model Name</Label>
                <Input id="modelName" name="modelName" value={formData.modelName || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">API Key</Label>
                <Input id="apiKey" name="apiKey" type="password" value={formData.apiKey || ''} onChange={handleInputChange} className="col-span-3 bg-gray-700 text-gray-100" />
              </div>
            </>
          )}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Connections = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isNewConnectionDialogOpen, setIsNewConnectionDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [connections, setConnections] = useState([
    { id: 1, name: 'PostgreSQL Database', type: 'database', status: 'Connected', icon: Database },
    { id: 2, name: 'AWS S3 Bucket', type: 'cloud', status: 'Connected', icon: Cloud },
    { id: 3, name: 'Google Drive', type: 'cloud', status: 'Disconnected', icon: FileText },
    { id: 4, name: 'Stripe API', type: 'api', status: 'Connected', icon: LinkIcon },
    { id: 5, name: 'OpenAI GPT-3', type: 'ai', status: 'Connected', icon: Brain },
  ]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);

  const filteredConnections = connections
    .filter(conn => activeTab === 'all' || conn.type === activeTab)
    .filter(conn => conn.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(conn => typeFilter === 'All Types' || conn.type === typeFilter.toLowerCase())
    .sort((a, b) => {
      if (a.status === 'Connected' && b.status !== 'Connected') return -1;
      if (a.status !== 'Connected' && b.status === 'Connected') return 1;
      return 0;
    });

  const handleConfigure = (connection) => {
    setSelectedConnection(connection);
    setIsConfigureModalOpen(true);
  };

  const handleToggle = (connection) => {
    setConnections(connections.map(conn =>
      conn.id === connection.id
        ? { ...conn, status: conn.status === 'Connected' ? 'Disconnected' : 'Connected' }
        : conn
    ));
  };

  const handleSaveConnection = (updatedConnection) => {
    setConnections(connections.map(conn =>
      conn.id === updatedConnection.id ? updatedConnection : conn
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100">Connections</h1>
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
                placeholder="Search connections..."
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
              {filteredConnections.map((conn) => (
                <ConnectionCard 
                  key={conn.id} 
                  connection={conn} 
                  onConfigure={handleConfigure}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => setIsNewConnectionDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add New Connection
          </Button>
        </div>

        <ConfigureConnectionModal 
          isOpen={isConfigureModalOpen}
          onClose={() => setIsConfigureModalOpen(false)}
          connection={selectedConnection}
          onSave={handleSaveConnection}
        />
      </div>
    </div>
  );
};

export default Connections;