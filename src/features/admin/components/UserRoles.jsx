import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/common/components/ui/select";

const UserRoles = ({ roles, handleRoleChange }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">User Roles</h2>
    {roles.map((role) => (
      <div key={role.userId} className="flex items-center space-x-4">
        <span>{role.email}</span>
        <Select value={role.role} onValueChange={(value) => handleRoleChange(role.userId, value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ))}
  </div>
);

export default UserRoles;

// Path: src/features/admin/components/UserRoles.jsx