import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Home = () => {
  console.log("Rendering Home component");
  
  try {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <img src="/lion-studio-logo.jpeg" alt="Lion Studio Logo" className="w-12 h-12" />
          <nav>
            <Link to="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
          </nav>
        </header>
        
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Intelligent Workflow Automation
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Streamline your business processes with AI-powered automation solutions
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </Link>
        </main>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Accelerate your workflows with our high-performance automation engine."
            />
            <FeatureCard
              icon="🔀"
              title="Flexible Workflows"
              description="Design and customize workflows to fit your unique business needs."
            />
            <FeatureCard
              icon="🧠"
              title="AI-Powered"
              description="Leverage cutting-edge AI to make your workflows smarter and more efficient."
            />
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p>Ready to Transform Your Business?</p>
            <p className="mt-2">Join thousands of companies already using Lion Studio for their workflow automation</p>
            <Link to="/register" className="mt-4 inline-block">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Sign Up Now</Button>
            </Link>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error rendering Home component:", error);
    return <div>An error occurred while loading the home page. Please try again later.</div>;
  }
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

export default Home;