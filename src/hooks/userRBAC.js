import { useState, useEffect } from "react";
import { RoleService } from "../services/mockApi";

export const useRBAC = (initialRoles = []) => {
  const [roles, setRoles] = useState(initialRoles);

  useEffect(() => {
    const fetchRoles = async () => {
      const fetchedRoles = RoleService.getRoles();
      setRoles(fetchedRoles);
    };

    fetchRoles();
  }, []);

  const createRole = (roleData) => {
    const newRole = RoleService.createRole(roleData);
    setRoles([...roles, newRole]);
    return newRole;
  };

  const updateRole = (roleId, updateData) => {
    const updatedRole = RoleService.updateRole(roleId, updateData);
    setRoles(roles.map((r) => (r.id === roleId ? updatedRole : r)));
    return updatedRole;
  };

  const deleteRole = (roleId) => {
    const updatedRoles = RoleService.deleteRole(roleId);
    setRoles(updatedRoles);
  };

  const checkPermission = (roleName, permission) => {
    const role = roles.find((r) => r.name === roleName);
    return role?.permissions?.includes(permission) || false;
  };

  return {
    roles,
    createRole,
    updateRole,
    deleteRole,
    checkPermission,
  };
};
