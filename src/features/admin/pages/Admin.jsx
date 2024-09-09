import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/common/components/ui/tabs";
import TabSwitchBar from '@/common/components/TabSwitchBar';
import UserRoles from '../components/UserRoles';
import SecuritySettings from '../components/SecuritySettings';
import Secrets from '../components/Secrets';
import { useAdminData } from '../useAdminData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    roles,
    securitySettings,
    secrets,
    newSecret,
    setNewSecret,
    handleRoleChange,
    handleSecuritySettingChange,
    handleAddSecret,
    handleUpdateSecret,
    handleDeleteSecret,
  } = useAdminData();

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'security', label: 'Security' },
    { value: 'secrets', label: 'Secrets' },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="min-h-screen bg-gray-900 text-gray-100">
        <TabSwitchBar tabs={tabs} />
        <TabsContent value="overview">
          <UserRoles roles={roles} handleRoleChange={handleRoleChange} />
          {/* Access Logs have been removed */}
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings settings={securitySettings} handleSettingChange={handleSecuritySettingChange} />
        </TabsContent>
        <TabsContent value="secrets">
          <Secrets
            secrets={secrets}
            newSecret={newSecret}
            setNewSecret={setNewSecret}
            handleAddSecret={handleAddSecret}
            handleUpdateSecret={handleUpdateSecret}
            handleDeleteSecret={handleDeleteSecret}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;