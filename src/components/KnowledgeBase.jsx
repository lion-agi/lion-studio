import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search } from 'lucide-react';
import ThreadItem from './ThreadItem';
import PageItem from './PageItem';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
  const [newCollection, setNewCollection] = useState({
    title: '',
    emoji: '',
    description: '',
    aiPrompt: '',
    privacy: 'Shareable'
  });

  const threads = [
    {
      id: 1,
      title: "Quantum-Inspired Cognitive Algorithms",
      content: "Quantum-inspired algorithms are computational methods that draw inspiration from quantum mechanics principles but can be implemented on classical computers...",
      createdAt: "2 days ago",
      collection: "agentic",
      views: 0,
      timeToRead: "5 min",
      status: "Draft"
    },
    {
      id: 2,
      title: "The Tao and Complex Systems",
      content: "The intersection of Eastern philosophy, complex systems theory, and modern physics reveals intriguing parallels in how we understand the fundamental nature of reality...",
      createdAt: "1 week ago",
      collection: "agentic",
      views: 0,
      timeToRead: "7 min",
      status: "Draft"
    },
    {
      id: 3,
      title: "Efficient Knowledge Graph Structures",
      content: "Cognitive architectures and large-scale knowledge representation systems often rely on graph-based structures to organize and retrieve information efficiently...",
      createdAt: "2 weeks ago",
      collection: "agentic",
      views: 1,
      timeToRead: "10 min"
    },
    {
      id: 4,
      title: "Promoting AI Problem-Solving Techniques",
      content: "Enhancing AI language models' problem-solving capabilities involves implementing various techniques such as decomposition, abstraction, and analogical reasoning...",
      createdAt: "3 weeks ago",
      collection: "agentic",
      views: 1,
      timeToRead: "8 min"
    },
    {
      id: 5,
      title: "AI Multi-Agent Systems: Challenges and Opportunities",
      content: "Large language models (LLMs) have revolutionized natural language processing, but their integration into multi-agent systems presents both exciting opportunities and significant challenges...",
      createdAt: "1 month ago",
      collection: "agentic",
      views: 1,
      timeToRead: "12 min"
    },
    {
      id: 6,
      title: "How to Deprecate Functions with Pydantic",
      content: "Pydantic offers several options for marking functions or methods as deprecated, allowing developers to gracefully phase out old APIs while maintaining backwards compatibility...",
      createdAt: "1 month ago",
      collection: "agentic",
      views: 2,
      timeToRead: "6 min"
    }
  ];

  const pages = [
    {
      id: 1,
      title: "AI Startups' Go-to-Market Strategies",
      content: "Effective go-to-market strategies for AI startups often involve a combination of thought leadership, strategic partnerships, and targeted solution selling...",
      createdAt: "3 days ago",
      collection: "agentic",
      views: 5,
      timeToRead: "15 min"
    },
    {
      id: 2,
      title: "Architectural Patterns for Agentic AI",
      content: "Designing robust and scalable architectures for agentic AI systems requires careful consideration of modularity, communication protocols, and decision-making frameworks...",
      createdAt: "1 week ago",
      collection: "agentic",
      views: 3,
      timeToRead: "20 min"
    },
    {
      id: 3,
      title: "Optimizing LionAGI's Element Class",
      content: "The Element class in LionAGI serves as a fundamental building block for constructing complex AI agents. Optimizing its performance and flexibility is crucial for system-wide improvements...",
      createdAt: "2 weeks ago",
      collection: "agentic",
      views: 7,
      timeToRead: "12 min"
    }
  ];

  const handleCreateCollection = () => {
    console.log('Creating collection:', newCollection);
    setIsCreateCollectionOpen(false);
    setNewCollection({
      title: '',
      emoji: '',
      description: '',
      aiPrompt: '',
      privacy: 'Shareable'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search your threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <Button variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Thread
        </Button>
        <Button variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Page
        </Button>
        <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Collection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Collection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">Title</label>
                <Input
                  id="title"
                  value={newCollection.title}
                  onChange={(e) => setNewCollection({...newCollection, title: e.target.value})}
                  className="col-span-3"
                  placeholder="Vacation Planning"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="emoji" className="text-right">Emoji</label>
                <Input
                  id="emoji"
                  value={newCollection.emoji}
                  onChange={(e) => setNewCollection({...newCollection, emoji: e.target.value})}
                  className="col-span-3"
                  placeholder="+"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">Description</label>
                <Textarea
                  id="description"
                  value={newCollection.description}
                  onChange={(e) => setNewCollection({...newCollection, description: e.target.value})}
                  className="col-span-3"
                  placeholder="Planning a trip to Europe"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="aiPrompt" className="text-right">AI Prompt</label>
                <Textarea
                  id="aiPrompt"
                  value={newCollection.aiPrompt}
                  onChange={(e) => setNewCollection({...newCollection, aiPrompt: e.target.value})}
                  className="col-span-3"
                  placeholder="You are a travel agent. Help me plan my trip around boutique hotels, local food, and museums."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="privacy" className="text-right">Privacy</label>
                <Select
                  value={newCollection.privacy}
                  onValueChange={(value) => setNewCollection({...newCollection, privacy: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select privacy setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shareable">Shareable</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateCollection}>Create</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="threads">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <div className="space-y-4">
            {threads.map((thread) => (
              <ThreadItem key={thread.id} thread={thread} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pages">
          <div className="space-y-4">
            {pages.map((page) => (
              <PageItem key={page.id} page={page} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Collections</h2>
        <div className="bg-card p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">agentic</h3>
              <p className="text-sm text-muted-foreground">0 threads • 1mo</p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;