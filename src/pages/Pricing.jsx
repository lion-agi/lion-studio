import React from 'react';
import MainWebsiteLayout from '../common/components/MainWebsiteLayout';

const Pricing = () => {
  return (
    <MainWebsiteLayout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8">Pricing</h1>
        <p className="text-lg mb-4">
          Discover our flexible pricing plans designed to meet the needs of businesses of all sizes. Choose the plan that best suits your requirements and start optimizing your workflows today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Basic Plan</h2>
            <p className="text-lg mb-4">$19.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>Access to basic features</li>
              <li>Up to 5 users</li>
              <li>Email support</li>
            </ul>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Get Started</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
            <p className="text-lg mb-4">$49.99/month</p>
            <ul className="list-disc list-inside mb-4">
              <li>Access to all features</li>
              <li>Up to 20 users</li>
              <li>Priority email support</li>
            </ul>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Get Started</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Enterprise Plan</h2>
            <p className="text-lg mb-4">Contact us for pricing</p>
            <ul className="list-disc list-inside mb-4">
              <li>Custom features</li>
              <li>Unlimited users</li>
              <li>Dedicated support</li>
            </ul>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Contact Us</button>
          </div>
        </div>
      </div>
    </MainWebsiteLayout>
  );
};

export default Pricing;
