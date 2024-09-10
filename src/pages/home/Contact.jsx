import React from 'react';
import MainWebsiteLayout from '../../common/components/MainWebsiteLayout';

const Contact = () => {
  return (
    <MainWebsiteLayout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-lg mb-4">
          We would love to hear from you! Whether you have a question about our services, need assistance, or just want to provide feedback, feel free to reach out to us.
        </p>
        <p className="text-lg mb-4">
          You can contact us via email at <a href="mailto:support@lionstudio.com" className="text-purple-600">support@lionstudio.com</a> or call us at (123) 456-7890.
        </p>
        <p className="text-lg mb-4">
          Our office is located at:
        </p>
        <address className="text-lg mb-4">
          Lion Studio<br />
          123 Workflow Ave<br />
          Automation City, AC 12345
        </address>
        <p className="text-lg mb-4">
          We look forward to hearing from you!
        </p>
      </div>
    </MainWebsiteLayout>
  );
};

export default Contact;


// Path: src/pages/home/Contact.jsx