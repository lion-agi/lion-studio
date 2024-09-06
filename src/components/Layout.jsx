import React from 'react';
import TopNavigation from "./navbar/TopNavigation";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <TopNavigation />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 mt-20 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">
            © 2024 Lion Studio Workflow Automation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;