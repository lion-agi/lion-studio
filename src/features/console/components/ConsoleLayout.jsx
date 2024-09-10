import React from 'react';
import ConsoleHeader from './ConsoleHeader';
import commonStyles from '@/common/components/ui/style-guide';

const ConsoleLayout = ({ children }) => (
  <div className="min-h-screen bg-background flex flex-col" style={commonStyles}>
    <ConsoleHeader />
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        {children}
      </div>
    </main>
    <footer className="bg-gray-900 text-gray-400 py-4 text-center text-sm">
      &copy; {new Date().getFullYear()} Lion Intelligence. All rights reserved.
    </footer>
  </div>
);

export default ConsoleLayout;
