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
import DataSourceList from '../../features/library/components/DataSourceList';

const mockTypeNames = {
  1: 'SQL Database',
  2: 'NoSQL Database',
  3: 'REST API',
  4: 'GraphQL API',
  5: 'File Storage',
  6: 'Message Queue',
  7: 'Search Engine',
  8: 'Cache',
  9: 'Blockchain',
  10: 'IoT Device'
};

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

  const dataSources = [
    { id: 1, name: 'PostgreSQL Database', type_id: 1, description: 'Main application database', last_sync: '2023-05-15T14:30:45', health_status: 'Healthy' },
    { id: 2, name: 'MongoDB Atlas', type_id: 2, description: 'NoSQL database for user data', last_sync: '2023-05-15T15:45:30', health_status: 'Warning' },
    { id: 3, name: 'Stripe API', type_id: 3, description: 'Payment processing API', last_sync: '2023-05-15T16:20:15', health_status: 'Healthy' },
    { id: 4, name: 'AWS S3 Bucket', type_id: 5, description: 'File storage for user uploads', last_sync: '2023-05-15T17:10:00', health_status: 'Healthy' },
    { id: 5, name: 'Elasticsearch', type_id: 7, description: 'Search engine for product catalog', last_sync: '2023-05-15T18:05:30', health_status: 'Error' },
  ];

  const filteredDataSources = dataSources
    .filter(source => source.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(source => typeFilter === 'All Types' || mockTypeNames[source.type_id] === typeFilter);

  const handleOpenModal = (dataSource) => {
    console.log('Opening modal for:', dataSource);
    // Implement modal opening logic here
  };

  const handleDelete = (id) => {
    console.log('Deleting data source:', id);
    // Implement delete logic here
  };

  const handleEdit = (id) => {
    console.log('Editing data source:', id);
    // Implement edit logic here
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

        <DataSourceList 
          dataSources={filteredDataSources}
          onOpenModal={handleOpenModal}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

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