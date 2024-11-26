import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RoleService } from "../services/mockApi";

// All possible permissions
const ALL_PERMISSIONS = [
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

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    // Fetch roles when component mounts
    const fetchedRoles = RoleService.getRoles();
    setRoles(fetchedRoles);
  }, []);

  const handleAddRole = (newRole) => {
    const createdRole = RoleService.createRole(newRole);
    setRoles([...roles, createdRole]);
    setIsModalOpen(false);
  };

  const handleUpdateRole = (roleId, updatedRole) => {
    const updated = RoleService.updateRole(roleId, updatedRole);
    setRoles(
      roles.map((role) => (role.id === roleId ? { ...role, ...updated } : role))
    );
    setSelectedRole(null);
    setIsModalOpen(false);
  };

  const handleDeleteRole = (roleId) => {
    RoleService.deleteRole(roleId);
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white shadow-custom rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <button
          onClick={() => {
            setSelectedRole(null);
            setIsModalOpen(true);
          }}
          className="flex items-center bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Role Name</th>
              <th className="px-4 py-3 text-left">Permissions</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span
                    className={`
                    px-2 py-1 rounded-full text-xs 
                    ${
                      role.name === "Admin"
                        ? "bg-red-100 text-red-800"
                        : role.name === "Editor"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  `}
                  >
                    {role.name}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  <button
                    onClick={() => openEditModal(role)}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                    title="Edit"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Modal (Add/Edit) */}
      {isModalOpen && (
        <RoleModal
          role={selectedRole}
          onClose={() => setIsModalOpen(false)}
          onSubmit={
            selectedRole
              ? (data) => handleUpdateRole(selectedRole.id, data)
              : handleAddRole
          }
        />
      )}
    </div>
  );
}

// Role Modal Component
function RoleModal({ role, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: role?.name || "",
    permissions: role?.permissions || [],
  });

  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const togglePermission = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl mb-4">{role ? "Edit Role" : "Add Role"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Role Name"
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <h3 className="text-lg mb-2">Permissions</h3>
            <div className="grid grid-cols-2 gap-2">
              {ALL_PERMISSIONS.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="form-checkbox"
                  />
                  <span className="text-sm">
                    {permission.replace("_", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-500 text-white px-4 py-2 rounded"
            >
              {role ? "Update" : "Add"} Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleManagement;
