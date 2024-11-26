import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRBAC } from "../contexts/RBACContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const { hasPermission } = useRBAC();

  const sidebarItems = [
    {
      name: "Dashboard",
      permission: "view_dashboard",
      path: "/",
    },
    {
      name: "User Management",
      permission: "manage_users",
      path: "/users",
    },
    {
      name: "Role Management",
      permission: "manage_roles",
      path: "/roles",
    },
  ];

  return (
    <div className="sidebar">
      <div className="user-info">
        <h3>{user?.username}</h3>
        <p>{user?.role}</p>
      </div>
      <nav>
        {sidebarItems.map(
          (item) =>
            hasPermission(user?.role, item.permission) && (
              <a key={item.name} href={item.path} className="sidebar-item">
                {item.name}
              </a>
            )
        )}
      </nav>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Sidebar;
