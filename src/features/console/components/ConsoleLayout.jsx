import React from 'react';
import { Outlet } from 'react-router-dom';
import ConsoleHeader from '@/common/components/ConsoleHeader';
import { Toaster } from "@/common/components/ui/toaster";
import commonStyles from '@/common/components/ui/style-guide';

const ConsoleLayout = () => (
  <div className="min-h-screen bg-background flex flex-col" style={commonStyles}>
    <ConsoleHeader />
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="bg-card shadow-sm rounded-lg p-6">
        <Outlet />
      </div>
    </main>
    <footer className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
      &copy; {new Date().getFullYear()} Lion Intelligence. All rights reserved.
    </footer>
    <Toaster />
  </div>
);

export default ConsoleLayout;
