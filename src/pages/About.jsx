import React from 'react';
import MainWebsiteLayout from '../common/components/MainWebsiteLayout';

const About = () => {
  return (
    <MainWebsiteLayout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to Lion Studio! We are dedicated to providing the best workflow automation solutions for your business. Our team of experts is committed to helping you streamline your processes and achieve your goals.
        </p>
        <p className="text-lg mb-4">
          Our mission is to empower businesses with intelligent automation tools that enhance productivity and efficiency. We believe in the power of technology to transform the way you work, and we are here to support you every step of the way.
        </p>
        <p className="text-lg mb-4">
          Thank you for choosing Lion Studio. We look forward to working with you and helping you succeed.
        </p>
      </div>
    </MainWebsiteLayout>
  );
};

export default About;
