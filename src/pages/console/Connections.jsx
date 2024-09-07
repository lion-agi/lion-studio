import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { Badge } from "@/common/components/ui/badge";
import { Switch } from "@/common/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { AlertTriangle, CheckCircle2, XCircle, Database, Cloud, FileText, Link as LinkIcon, Brain, Search } from 'lucide-react';

const mockTypeNames = {
  1: "SQL Database",
  2: "NoSQL Database",
  3: "Cloud Storage",
  4: "File System",
  5: "API",
  6: "AI Model",
  7: "Message Queue",
  8: "Cache",
  9: "Search Engine",
  10: "Blockchain"
};

const ConnectionCard = ({ name, type_id, status, last_sync, icon: Icon }) => (
  <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-lg font-semibold text-gray-100">{name}</CardTitle>
      <Icon className="h-5 w-5 text-gray-400" />
    </CardHeader>
    <CardContent>
      <Badge variant={status === 'Connected' ? 'success' : 'secondary'}>{status}</Badge>
      <p className="text-sm text-gray-400 mt-2">Type: {mockTypeNames[type_id]}</p>
      <p className="text-sm text-gray-400">Last sync: {new Date(last_sync).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm">Configure</Button>
      <Switch checked={status === 'Connected'} />
    </CardFooter>
  </Card>
);

const NewConnectionDialog = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
      <DialogHeader>
        <DialogTitle>Add New Connection</DialogTitle>
        <DialogDescription className="text-gray-400">
          Enter the details for your new connection.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3 bg-gray-700 text-gray-100" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select>
            <SelectTrigger className="col-span-3 bg-gray-700 text-gray-100">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 text-gray-100">
              {Object.entries(mockTypeNames).map(([id, name]) => (
                <SelectItem key={id} value={id}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="credentials" className="text-right">
            Credentials
          </Label>
          <Input id="credentials" type="password" className="col-span-3 bg-gray-700 text-gray-100" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Add Connection</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Connections = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isNewConnectionDialogOpen, setIsNewConnectionDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const connections = [
    { name: 'PostgreSQL Database', type_id: 1, status: 'Connected', last_sync: '2023-05-15T10:30:00', icon: Database },
    { name: 'AWS S3 Bucket', type_id: 3, status: 'Connected', last_sync: '2023-05-14T15:45:00', icon: Cloud },
    { name: 'Google Drive', type_id: 4, status: 'Disconnected', last_sync: '2023-05-13T09:15:00', icon: FileText },
    { name: 'Stripe API', type_id: 5, status: 'Connected', last_sync: '2023-05-15T11:00:00', icon: LinkIcon },
    { name: 'OpenAI GPT-3', type_id: 6, status: 'Connected', last_sync: '2023-05-15T08:30:00', icon: Brain },
  ];

  const filteredConnections = connections
    .filter(conn => activeTab === 'all' || mockTypeNames[conn.type_id].toLowerCase().includes(activeTab.toLowerCase()))
    .filter(conn => conn.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(conn => typeFilter === 'All Types' || mockTypeNames[conn.type_id] === typeFilter);

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
                {Object.values(mockTypeNames).map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
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

        <Alert variant="warning" className="bg-yellow-900 border-yellow-600">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription className="text-gray-300">
            Ensure all connections use secure protocols and keep credentials confidential. Regularly review and update your connection settings.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All</TabsTrigger>
            {Object.values(mockTypeNames).map((name) => (
              <TabsTrigger key={name} value={name.toLowerCase()} className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">{name}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConnections.map((conn, index) => (
                <ConnectionCard key={index} {...conn} />
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

        <NewConnectionDialog 
          isOpen={isNewConnectionDialogOpen} 
          onClose={() => setIsNewConnectionDialogOpen(false)} 
        />
      </div>
    </div>
  );
};

export default Connections;