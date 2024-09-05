import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Trash2 } from 'lucide-react';

const KnowledgeBase = () => {
  const knowledgeItems = [
    { title: "Attention is All You Need", content: "View Content" },
    { title: "Artificial Intelligence Index Report 2024", content: "View Content" },
    { title: "PaLM-E: An Embodied Multimodal Language Model", content: "View Content" },
    { title: "Generative Agents: Interactive Simulacra of Human Behavior", content: "View Content" },
    { title: "Large Language Models Encode Clinical Knowledge", content: "View Content" },
    { title: "Position: Levels of AGI for Operationalizing Progress on the Path to AGI", content: "View Content" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1">
        <aside className="w-64 bg-card hidden lg:block p-6 space-y-4">
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-2 text-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Generate</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span>My Library</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>Help</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Feedback</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span>Admin</span>
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Transform your content into engaging AI-generated audio discussions</h1>
          <p className="text-muted-foreground mb-6">Elevate your content with Muse: AI-powered summaries and lifelike audio narrations at your fingertips.</p>
          <Button className="mb-8">Add API Keys To Start</Button>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Public</h2>
            <Button variant="outline">Retry All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeItems.map((item, index) => (
              <Card key={index} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="#" className="text-primary hover:underline">{item.content}</a>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">Audio Unavailable</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default KnowledgeBase;