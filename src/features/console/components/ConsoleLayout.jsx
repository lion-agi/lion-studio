import React from 'react';
import ConsoleHeader from './ConsoleHeader';

const ConsoleLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <ConsoleHeader />
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        {children}
      </div>
    </main>
    <footer className="bg-gray-900 text-gray-400 py-4 text-center text-xs mt-auto">
      <p>&copy; {new Date().getFullYear()} Lion Intelligence LLC</p>
      <p>Long Island City, New York, 11102</p>
    </footer>
  </div>
);

export default ConsoleLayout;