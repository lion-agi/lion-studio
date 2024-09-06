import React from 'react';
import ConsoleHeader from './header/ConsoleHeader';

const ConsoleLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <ConsoleHeader />
    <main className="flex-grow container mx-auto px-4 py-8">
      {children}
    </main>
  </div>
);

export default ConsoleLayout;