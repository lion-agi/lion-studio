import { useState } from 'react';

const useDeployment = () => {
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

  return {
    activeTab,
    setActiveTab,
    isNewDeploymentDialogOpen,
    setIsNewDeploymentDialogOpen,
    searchTerm,
    setSearchTerm,
    environmentFilter,
    setEnvironmentFilter,
    filteredDeployments,
  };
};

export default useDeployment;
