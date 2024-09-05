import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabaseAuth } from '@/integrations/supabase';
import { ArrowRight, Home, Zap, BookOpen, HelpCircle, MessageSquare, Settings, Download, Trash2 } from 'lucide-react';

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const [knowledgeBases, setKnowledgeBases] = useState([
    { id: 1, title: "Attention is All You Need", content: "View Content" },
    { id: 2, title: "Artificial Intelligence Index Report 2024", content: "View Content" },
    { id: 3, title: "PaLM-E: An Embodied Multimodal Language Model", content: "View Content" },
    { id: 4, title: "Generative Agents: Interactive Simulacra of Human Behavior", content: "View Content" },
    { id: 5, title: "Large Language Models Encode Clinical Knowledge", content: "View Content" },
    { id: 6, title: "Position: Levels of AGI for Operationalizing Progress on the Path to AGI", content: "View Content" },
  ]);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card text-card-foreground p-4 hidden md:block">
        <nav className="space-y-2">
          <NavItem icon={<Home className="h-5 w-5" />} label="Home" />
          <NavItem icon={<Zap className="h-5 w-5" />} label="Generate" />
          <NavItem icon={<BookOpen className="h-5 w-5" />} label="My Library" />
          <NavItem icon={<HelpCircle className="h-5 w-5" />} label="Help" />
          <NavItem icon={<MessageSquare className="h-5 w-5" />} label="Feedback" />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Admin" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Transform your content into engaging AI-generated audio discussions</h1>
        <p className="text-lg mb-6">Elevate your content with Muse: AI-powered summaries and lifelike audio narrations at your fingertips.</p>
        
        <Button className="mb-8">Add API Keys To Start</Button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Public</h2>
          <Button variant="outline">Retry All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {knowledgeBases.map((kb) => (
            <KnowledgeBaseCard key={kb.id} title={kb.title} content={kb.content} />
          ))}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  <Link to="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
    {icon}
    <span>{label}</span>
  </Link>
);

const KnowledgeBaseCard = ({ title, content }) => (
  <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-blue-500 hover:underline mb-2">{content}</p>
    <div className="flex justify-between items-center">
      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
    <div className="mt-2 p-2 bg-muted text-muted-foreground rounded">
      Audio Unavailable
    </div>
  </div>
);

export default Index;