import React, { useState, useEffect } from 'react';
import { useIntegrations, useAddIntegration, useUpdateIntegration, useDeleteIntegration } from '@/integrations/supabase/hooks/integrations';
import { useToast } from "@/common/components/ui/use-toast";
import { useStore } from '@/store';
import IntegrationCard from './components/IntegrationCard';
import IntegrationFilters from './components/IntegrationFilters';
import ConfigureIntegrationModal from './components/ConfigureIntegrationModal';
import { Button } from "@/common/components/ui/button";

const Integrations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [selectedIntegration, setSelectedIntegration] = useState(null);

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
    toggleIntegrationStatus(id);
    const integration = integrations.find(i => i.id === id);
    const status = activeIntegrations[id] ? 'Activated' : 'Deactivated';
    toast({
      title: `${integration.name} ${status}!`,
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
          title: "Integration Updated",
          description: "The integration has been successfully updated.",
          duration: 3000,
        });
      } else {
        const newIntegration = await addIntegration.mutateAsync(updatedIntegration);
        setIntegrations(prevIntegrations => [...prevIntegrations, newIntegration]);
        toast({
          title: "Integration Added",
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
      </div>
    </div>
  );
};

export default Integrations;