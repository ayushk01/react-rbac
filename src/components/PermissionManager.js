import React, { useState, useEffect } from "react";
import { RoleService } from "../services/mockApi";

function PermissionManager() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const allPossiblePermissions = [
    "read",
    "write",
    "delete",
    "create",
    "update",
    "manage_users",
    "manage_roles",
    "view_dashboard",
    "edit_content",
    "approve_content",
  ];

  useEffect(() => {
    setRoles(RoleService.getRoles());
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const togglePermission = (permission) => {
    if (!selectedRole) return;

    const currentPermissions = selectedRole.permissions || [];
    const newPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter((p) => p !== permission)
      : [...currentPermissions, permission];

    const updatedRole = RoleService.updateRole(selectedRole.id, {
      ...selectedRole,
      permissions: newPermissions,
    });

    setRoles(roles.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
    setSelectedRole(updatedRole);
  };

  return (
    <div className="permission-manager">
      <h2>Permission Management</h2>

      <div className="role-permission-selector">
        <div className="role-list">
          <h3>Roles</h3>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={selectedRole?.id === role.id ? "selected" : ""}
            >
              {role.name}
            </button>
          ))}
        </div>

        {selectedRole && (
          <div className="permission-grid">
            <h3>Permissions for {selectedRole.name}</h3>
            {allPossiblePermissions.map((permission) => (
              <label key={permission} className="permission-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRole.permissions?.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
                {permission.replace("_", " ")}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PermissionManager;
