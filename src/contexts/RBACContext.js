import React, { createContext, useState, useContext, useEffect } from "react";
import { RoleService } from "../services/mockApi";

const RBACContext = createContext(null);

export const RBACProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const fetchRoles = () => {
      const fetchedRoles = RoleService.getRoles();
      setRoles(fetchedRoles);

      // Create a permissions map
      const permissionsMap = fetchedRoles.reduce((acc, role) => {
        acc[role.name] = role.permissions || [];
        return acc;
      }, {});

      setPermissions(permissionsMap);
    };

    fetchRoles();
  }, []);

  const hasPermission = (roleName, requiredPermission) => {
    return permissions[roleName]?.includes(requiredPermission) || false;
  };

  const getRolePermissions = (roleName) => {
    return permissions[roleName] || [];
  };

  return (
    <RBACContext.Provider
      value={{
        roles,
        permissions,
        hasPermission,
        getRolePermissions,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => useContext(RBACContext);

export default RBACContext;
