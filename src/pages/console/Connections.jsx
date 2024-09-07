import React, { useState } from 'react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/ui/alert";
import { AlertTriangle, Search, Database, Cloud, FileText, Link as LinkIcon } from 'lucide-react';
import ConnectionItem from '@/features/connections/components/ConnectionItem';
import ConnectionForm from '@/features/connections/components/ConnectionForm';
import { useConnections, useAddConnection, useUpdateConnection, useDeleteConnection } from '@/integrations/supabase/hooks/connections';

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [isConnectionFormOpen, setIsConnectionFormOpen] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const { data: connections, isLoading, error } = useConnections();
  const addConnection = useAddConnection();
  const updateConnection = useUpdateConnection();
  const deleteConnection = useDeleteConnection();

  const handleOpenConnectionModal = (connection) => {
    setSelectedConnection(connection);
    setIsConnectionFormOpen(true);
  };

  const handleCloseConnectionModal = () => {
    setSelectedConnection(null);
    setIsConnectionFormOpen(false);
  };

  const handleSaveConnection = async (connectionData) => {
    try {
      if (selectedConnection) {
        await updateConnection.mutateAsync({ id: selectedConnection.id, ...connectionData });
      } else {
        await addConnection.mutateAsync(connectionData);
      }
      handleCloseConnectionModal();
    } catch (error) {
      console.error('Error saving connection:', error);
    }
  };

  const handleDeleteConnection = async (id) => {
    try {
      await deleteConnection.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  const filteredConnections = connections?.filter(conn =>
    conn && conn.name && conn.type && (
      conn.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === 'All Types' || conn.type === typeFilter.toLowerCase())
    )
  ) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
                <SelectItem value="API">API</SelectItem>
                <SelectItem value="File Storage">File Storage</SelectItem>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <ConnectionItem
              key={connection.id}
              connection={connection}
              onOpenModal={handleOpenConnectionModal}
              onDelete={handleDeleteConnection}
              onEdit={handleOpenConnectionModal}
            />
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => setIsConnectionFormOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add New Connection
          </Button>
        </div>

        <ConnectionForm 
          connection={selectedConnection}
          isOpen={isConnectionFormOpen}
          onClose={handleCloseConnectionModal}
          onSave={handleSaveConnection}
        />
      </div>
    </div>
  );
};

export default Connections;