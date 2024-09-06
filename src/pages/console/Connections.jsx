import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Database, Cloud, FileText, Link, Brain, AlertTriangle } from 'lucide-react';

const ConnectionCard = ({ name, type, status, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{name}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <Badge variant={status === 'Connected' ? 'default' : 'secondary'}>{status}</Badge>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm">Configure</Button>
      <Switch checked={status === 'Connected'} />
    </CardFooter>
  </Card>
);

const NewConnectionDialog = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Connection</DialogTitle>
        <DialogDescription>
          Enter the details for your new connection.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Input id="type" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="credentials" className="text-right">
            Credentials
          </Label>
          <Input id="credentials" type="password" className="col-span-3" />
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

  const connections = [
    { name: 'PostgreSQL Database', type: 'database', status: 'Connected', icon: Database },
    { name: 'AWS S3 Bucket', type: 'cloud', status: 'Connected', icon: Cloud },
    { name: 'Google Drive', type: 'file', status: 'Disconnected', icon: FileText },
    { name: 'Stripe API', type: 'api', status: 'Connected', icon: Link },
    { name: 'OpenAI GPT-3', type: 'ai', status: 'Connected', icon: Brain },
  ];

  const filteredConnections = activeTab === 'all' 
    ? connections 
    : connections.filter(conn => conn.type === activeTab);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Connections</h1>
        <Button onClick={() => setIsNewConnectionDialogOpen(true)}>Add New Connection</Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          Ensure all connections use secure protocols and keep credentials confidential. Regularly review and update your connection settings.
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="database">Databases</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
          <TabsTrigger value="file">File Storage</TabsTrigger>
          <TabsTrigger value="api">APIs</TabsTrigger>
          <TabsTrigger value="ai">AI Models</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnections.map((conn, index) => (
              <ConnectionCard key={index} {...conn} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <NewConnectionDialog 
        isOpen={isNewConnectionDialogOpen} 
        onClose={() => setIsNewConnectionDialogOpen(false)} 
      />
    </div>
  );
};

export default Connections;