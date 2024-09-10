import React from 'react';
import commonStyles from '@/common/components/ui/style-guide';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-6 text-sm" style={commonStyles}>
      <div className="flex justify-between items-center">
        <div>
          © {new Date().getFullYear()} Lion Intelligence. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
