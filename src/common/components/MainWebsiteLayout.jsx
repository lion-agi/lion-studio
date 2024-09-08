import React from 'react';
import MainWebsiteHeader from './header/MainWebsiteHeader';
import Footer from './footer';

const MainWebsiteLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainWebsiteHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainWebsiteLayout;
