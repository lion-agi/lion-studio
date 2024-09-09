import { useState, useEffect } from 'react';
import { useToast } from "@/common/components/ui/use-toast";
import { useSupabaseAuth } from '@/integrations/supabase/auth';

export const useAdminData = () => {
  const { user, getUserRoles, updateUserRoles, getAccessLogs, getSecuritySettings, updateSecuritySettings, getSecrets, addSecret, updateSecret, deleteSecret } = useSupabaseAuth();
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

  return {
    roles,
    logs,
    securitySettings,
    secrets,
    newSecret,
    setNewSecret,
    handleRoleChange,
    handleSecuritySettingChange,
    handleAddSecret,
    handleUpdateSecret,
    handleDeleteSecret,
  };
};

// Path: src/features/admin/useAdminData.js