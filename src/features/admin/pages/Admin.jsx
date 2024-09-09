import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/common/components/ui/tabs";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Label } from "@/common/components/ui/label";
import { useToast } from "@/common/components/ui/use-toast";
import { useSupabaseAuth } from '@/integrations/supabase/auth';

const Admin = () => {
  const { user, getUserRoles, updateUserRoles, getAccessLogs, getSecuritySettings, updateSecuritySettings, getSecrets, addSecret, updateSecret, deleteSecret } = useSupabaseAuth();
  const [activeTab, setActiveTab] = useState('security');
  const [roles, setRoles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [securitySettings, setSecuritySettings] = useState({});
  const [secrets, setSecrets] = useState([]);
  const [newSecret, setNewSecret] = useState({ key: '', value: '' });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserRoles();
      fetchAccessLogs();
      fetchSecuritySettings();
      fetchSecrets();
    }
  }, [user]);

  const fetchUserRoles = async () => {
    try {
      const data = await getUserRoles();
      setRoles(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user roles",
        variant: "destructive",
      });
    }
  };

  const fetchAccessLogs = async () => {
    try {
      const data = await getAccessLogs();
      setLogs(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch access logs",
        variant: "destructive",
      });
    }
  };

  const fetchSecuritySettings = async () => {
    try {
      const data = await getSecuritySettings();
      setSecuritySettings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch security settings",
        variant: "destructive",
      });
    }
  };

  const fetchSecrets = async () => {
    try {
      const data = await getSecrets();
      setSecrets(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch secrets",
        variant: "destructive",
      });
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRoles(userId, role);
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const handleSecuritySettingChange = async (setting, value) => {
    try {
      await updateSecuritySettings(setting, value);
      toast({
        title: "Success",
        description: "Security setting updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security setting",
        variant: "destructive",
      });
    }
  };

  const handleAddSecret = async () => {
    try {
      await addSecret(newSecret);
      setNewSecret({ key: '', value: '' });
      fetchSecrets();
      toast({
        title: "Success",
        description: "Secret added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add secret",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSecret = async (id, updatedSecret) => {
    try {
      await updateSecret(id, updatedSecret);
      fetchSecrets();
      toast({
        title: "Success",
        description: "Secret updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update secret",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSecret = async (id) => {
    try {
      await deleteSecret(id);
      fetchSecrets();
      toast({
        title: "Success",
        description: "Secret deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete secret",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="secrets">Secrets</TabsTrigger>
        </TabsList>
        <TabsContent value="security">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">User Roles</h2>
            {roles.map((role) => (
              <div key={role.userId} className="flex items-center space-x-4">
                <span>{role.email}</span>
                <select
                  value={role.role}
                  onChange={(e) => handleRoleChange(role.userId, e.target.value)}
                  className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            ))}
          </div>
          <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Access Logs</h2>
            {logs.map((log) => (
              <div key={log.id} className="flex items-center space-x-4">
                <span>{log.timestamp}</span>
                <span>{log.action}</span>
                <span>{log.user}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Security Settings</h2>
            {Object.keys(securitySettings).map((setting) => (
              <div key={setting} className="flex items-center space-x-4">
                <Label htmlFor={setting}>{setting}</Label>
                <Input
                  id={setting}
                  value={securitySettings[setting]}
                  onChange={(e) => handleSecuritySettingChange(setting, e.target.value)}
                  className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="secrets">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Secrets</h2>
            {secrets.map((secret) => (
              <div key={secret.id} className="flex items-center space-x-4">
                <Input
                  value={secret.key}
                  onChange={(e) => handleUpdateSecret(secret.id, { ...secret, key: e.target.value })}
                  className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <Input
                  value={secret.value}
                  onChange={(e) => handleUpdateSecret(secret.id, { ...secret, value: e.target.value })}
                  className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <Button onClick={() => handleDeleteSecret(secret.id)} variant="outline" className="hover:bg-gray-800 transition-colors duration-200">
                  Delete
                </Button>
              </div>
            ))}
            <div className="flex items-center space-x-4 mt-4">
              <Input
                value={newSecret.key}
                onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
                placeholder="Key"
                className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <Input
                value={newSecret.value}
                onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
                placeholder="Value"
                className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <Button onClick={handleAddSecret} className="bg-purple-600 hover:bg-purple-700 text-white">
                Add Secret
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
