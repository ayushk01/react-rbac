import React, { useEffect } from "react";
import { initializeMockData } from "./services/mockApi";
import Layout from "./components/Layout";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManager from "./components/PermissionManager";
import { AuthProvider } from "./contexts/AuthContext";
import { RBACProvider } from "./contexts/RBACContext";

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <AuthProvider>
      <RBACProvider>
        <Layout>
          <div className="dashboard-grid">
            <UserManagement />
            <RoleManagement />
            <PermissionManager />
          </div>
        </Layout>
      </RBACProvider>
    </AuthProvider>
  );
}

export default App;
