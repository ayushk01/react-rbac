import { v4 as uuidv4 } from "uuid";

const STORAGE_KEYS = {
  USERS: "rbac_users",
  ROLES: "rbac_roles",
};

export const initializeMockData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.ROLES)) {
    const defaultRoles = [
      {
        id: uuidv4(),
        name: "Admin",
        permissions: [
          "read",
          "write",
          "delete",
          "manage_users",
          "manage_roles",
        ],
      },
      {
        id: uuidv4(),
        name: "Editor",
        permissions: ["read", "write"],
      },
      {
        id: uuidv4(),
        name: "Viewer",
        permissions: ["read"],
      },
    ];
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(defaultRoles));
  }

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: uuidv4(),
        username: "admin",
        email: "admin@example.com",
        role: "Admin",
        status: "Active",
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }
};

export const UserService = {
  getUsers: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
  },
  createUser: (userData) => {
    const users = UserService.getUsers();
    const newUser = { ...userData, id: uuidv4() };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },
  updateUser: (userId, updateData) => {
    const users = UserService.getUsers();
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateData };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
    return users[userIndex];
  },
  deleteUser: (userId) => {
    const users = UserService.getUsers().filter((u) => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users;
  },
};

export const RoleService = {
  getRoles: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ROLES) || "[]");
  },
  createRole: (roleData) => {
    const roles = RoleService.getRoles();
    const newRole = { ...roleData, id: uuidv4() };
    roles.push(newRole);
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
    return newRole;
  },
  updateRole: (roleId, updateData) => {
    const roles = RoleService.getRoles();
    const roleIndex = roles.findIndex((r) => r.id === roleId);
    if (roleIndex !== -1) {
      roles[roleIndex] = { ...roles[roleIndex], ...updateData };
      localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
    }
    return roles[roleIndex];
  },
  deleteRole: (roleId) => {
    const roles = RoleService.getRoles().filter((r) => r.id !== roleId);
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
    return roles;
  },
};
