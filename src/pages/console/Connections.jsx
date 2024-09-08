import React, { useState, useEffect } from 'react';
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
import { CheckCircle2, XCircle, Database, Cloud, FileText, Link as LinkIcon, Brain, Search, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/supabase';

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
  const [extraParams, setExtraParams] = useState(connection?.extra || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExtraParamChange = (key, value) => {
    setExtraParams(prev => ({ ...prev, [key]: value }));
  };

  const handleAddExtraParam = () => {
    setExtraParams(prev => ({ ...prev, '': '' }));
  };

  const handleRemoveExtraParam = (key) => {
    setExtraParams(prev => {
      const newParams = { ...prev };
      delete newParams[key];
      return newParams;
    });
  };

  const handleSave = () => {
    const updatedConnection = {
      ...formData,
      extra: extraParams
    };
    onSave(updatedConnection);
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
          {/* Add other fields based on the connection type */}
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
          <div className="space-y-4">
            <Label>Extra Parameters</Label>
            {Object.entries(extraParams).map(([key, value], index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Key"
                  value={key}
                  onChange={(e) => {
                    const newKey = e.target.value;
                    handleExtraParamChange(newKey, value);
                    handleRemoveExtraParam(key);
                  }}
                  className="flex-1 bg-gray-700 text-gray-100"
                />
                <Input
                  placeholder="Value"
                  value={value}
                  onChange={(e) => handleExtraParamChange(key, e.target.value)}
                  className="flex-1 bg-gray-700 text-gray-100"
                />
                <Button variant="ghost" size="sm" onClick={() => handleRemoveExtraParam(key)}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={handleAddExtraParam}>
              <Plus className="h-4 w-4 mr-2" />
              Add Extra Parameter
            </Button>
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
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const { data, error } = await supabase.from('connections').select('*');
      if (error) throw error;
      setConnections(data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

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

  const handleToggle = async (connection) => {
    const newStatus = connection.status === 'Connected' ? 'Disconnected' : 'Connected';
    try {
      const { data, error } = await supabase
        .from('connections')
        .update({ status: newStatus })
        .eq('id', connection.id);
      if (error) throw error;
      setConnections(connections.map(conn =>
        conn.id === connection.id ? { ...conn, status: newStatus } : conn
      ));
    } catch (error) {
      console.error('Error updating connection status:', error);
    }
  };

  const handleSaveConnection = async (updatedConnection) => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .upsert(updatedConnection, { onConflict: 'id' });
      if (error) throw error;
      setConnections(connections.map(conn =>
        conn.id === updatedConnection.id ? updatedConnection : conn
      ));
    } catch (error) {
      console.error('Error saving connection:', error);
    }
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