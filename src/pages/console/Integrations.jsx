import React, { useState, useEffect } from 'react';
import { useIntegrations, useAddIntegration, useUpdateIntegration, useDeleteIntegration } from '@/integrations/supabase/hooks/integrations';
import { useToast } from "@/common/components/ui/use-toast";
import { useStore } from '@/store';
import IntegrationCard from './components/IntegrationCard';
import IntegrationFilters from './components/IntegrationFilters';
import ConfigureIntegrationModal from './components/ConfigureIntegrationModal';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Info } from 'lucide-react';

const Integrations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const { data: fetchedIntegrations, isLoading, error } = useIntegrations();
  const addIntegration = useAddIntegration();
  const updateIntegration = useUpdateIntegration();
  const deleteIntegration = useDeleteIntegration();
  const { toast } = useToast();

  const integrations = useStore((state) => state.integrations);
  const activeIntegrations = useStore((state) => state.activeIntegrations);
  const setIntegrations = useStore((state) => state.setIntegrations);
  const toggleIntegrationStatus = useStore((state) => state.toggleIntegrationStatus);

  useEffect(() => {
    if (fetchedIntegrations) {
      setIntegrations(fetchedIntegrations);
    }
  }, [fetchedIntegrations, setIntegrations]);

  const filteredIntegrations = integrations
    ?.filter(conn => activeTab === 'all' || conn.type === activeTab)
    .filter(conn => conn.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(conn => typeFilter === 'All Types' || conn.type === typeFilter.toLowerCase())
    .sort((a, b) => {
      if (activeIntegrations[a.id] && !activeIntegrations[b.id]) return -1;
      if (!activeIntegrations[a.id] && activeIntegrations[b.id]) return 1;
      return 0;
    }) || [];

  const handleConfigure = (integration) => {
    setSelectedIntegration(integration);
    setIsConfigureModalOpen(true);
  };

  const handleToggle = (id) => {
    const newStatus = !activeIntegrations[id];
    toggleIntegrationStatus(id);
    const integration = integrations.find(i => i.id === id);
    const status = newStatus ? 'Activated' : 'Deactivated';
    toast({
      title: "Connection Status Update",
      description: `${integration.name} ${status}!`,
      duration: 3000,
    });
  };

  const handleSaveIntegration = async (updatedIntegration) => {
    try {
      if (updatedIntegration.id) {
        await updateIntegration.mutateAsync(updatedIntegration);
        setIntegrations(prevIntegrations =>
          prevIntegrations.map(integration =>
            integration.id === updatedIntegration.id ? updatedIntegration : integration
          )
        );
        toast({
          title: "Connection Status Update",
          description: "The integration has been successfully updated.",
          duration: 3000,
        });
      } else {
        const newIntegration = await addIntegration.mutateAsync(updatedIntegration);
        setIntegrations(prevIntegrations => [...prevIntegrations, newIntegration]);
        toast({
          title: "Connection Status Update",
          description: "A new integration has been successfully added.",
          duration: 3000,
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
        duration: 3000,
      });
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading integrations...</div>;
  if (error) return <div className="text-red-500">Error loading integrations: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mb-6 md:mb-0 text-gray-100 mr-4">Integrations</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsInfoModalOpen(true)}
              className="text-gray-400 hover:text-gray-100"
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <IntegrationFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConfigure={handleConfigure}
              onToggle={handleToggle}
              isActive={activeIntegrations[integration.id]}
            />
          ))}
        </div>

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

        <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>Integrations Information</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>Integrations allow you to connect Lion Studio with various external services and data sources. Here you can manage your integrations, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Database connections</li>
                <li>API integrations</li>
                <li>Cloud storage services</li>
                <li>AI model connections</li>
              </ul>
              <p className="mt-4">Use the filters and search bar to quickly find specific integrations.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Integrations;