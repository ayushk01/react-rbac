export const PERMISSION_TYPES = {
  READ: "read",
  WRITE: "write",
  DELETE: "delete",
  CREATE: "create",
  UPDATE: "update",
  MANAGE_USERS: "manage_users",
  MANAGE_ROLES: "manage_roles",
};

export const DEFAULT_ROLE_PERMISSIONS = {
  ADMIN: [
    PERMISSION_TYPES.READ,
    PERMISSION_TYPES.WRITE,
    PERMISSION_TYPES.DELETE,
    PERMISSION_TYPES.CREATE,
    PERMISSION_TYPES.UPDATE,
    PERMISSION_TYPES.MANAGE_USERS,
    PERMISSION_TYPES.MANAGE_ROLES,
  ],
  EDITOR: [
    PERMISSION_TYPES.READ,
    PERMISSION_TYPES.WRITE,
    PERMISSION_TYPES.CREATE,
    PERMISSION_TYPES.UPDATE,
  ],
  VIEWER: [PERMISSION_TYPES.READ],
};

export const canPerformAction = (userRole, requiredPermission) => {
  const rolePermissions =
    DEFAULT_ROLE_PERMISSIONS[userRole.toUpperCase()] || [];
  return rolePermissions.includes(requiredPermission);
};
