import React from "react";

function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RBAC Dashboard</h1>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <p>© 2024 RBAC Management System</p>
      </footer>
    </div>
  );
}

export default Layout;
