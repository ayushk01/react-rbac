import React from "react";
import {
  UserIcon,
  KeyIcon,
  ShieldCheckIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

function Dashboard() {
  const statsCards = [
    {
      title: "Total Users",
      value: "124",
      icon: <UserIcon className="w-12 h-12 text-blue-500" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Roles",
      value: "8",
      icon: <KeyIcon className="w-12 h-12 text-green-500" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Permission Sets",
      value: "15",
      icon: <ShieldCheckIcon className="w-12 h-12 text-purple-500" />,
      bgColor: "bg-purple-50",
    },
    {
      title: "System Settings",
      value: "5",
      icon: <CogIcon className="w-12 h-12 text-orange-500" />,
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          RBAC Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} p-6 rounded-lg shadow-custom flex items-center space-x-4 transform transition-all hover:scale-105`}
            >
              <div className="flex-shrink-0">{card.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-2xl font-bold text-gray-700">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-custom p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent User Activities
            </h2>
            <div className="space-y-4">
              {[
                {
                  user: "John Doe",
                  action: "Updated Role Permissions",
                  time: "2 mins ago",
                },
                {
                  user: "Jane Smith",
                  action: "Created New User",
                  time: "1 hour ago",
                },
                {
                  user: "Admin",
                  action: "System Configuration Update",
                  time: "3 hours ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      {activity.user}
                    </span>
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-gray-600">{activity.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-custom p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Access
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Manage Users", color: "bg-blue-500" },
                { name: "Role Config", color: "bg-green-500" },
                { name: "Permissions", color: "bg-purple-500" },
                { name: "Security", color: "bg-red-500" },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`${item.color} text-white py-3 rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
