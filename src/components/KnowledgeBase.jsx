import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search } from 'lucide-react';

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

  const knowledgeItems = [
    { title: "Quantum-Inspired Cognitive Algorithms", content: "Quantum-inspired algorithms are...", status: "Draft" },
    { title: "The Tao and Complex Systems", content: "The intersection of Eastern philosophy, complex...", status: "Draft" },
    { title: "Efficient Knowledge Graph Structures", content: "Cognitive architectures and large-scale knowledge...", views: 1 },
    { title: "Promoting AI Problem-Solving Techniques", content: "Enhancing AI language models' problem-solving...", views: 1 },
    { title: "AI Multi-Agent Systems: Challenges", content: "Large language models (LLMs) have revolutionize...", views: 1 },
    { title: "How to Deprecate Functions with Pydantic", content: "Pydantic offers several options for marking...", views: 2 },
    { title: "AI Startups' Go-to-Market Strategies", content: "AI startups focusing on...", status: "Draft" },
    { title: "Architectural Patterns for Agentic AI", content: "The development of...", views: 1 },
    { title: "Optimizing LionAGI's Element Class", content: "Pydantic, a popular data...", views: 2 },
  ];

  const filteredItems = knowledgeItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">Threads content</TabsContent>
        <TabsContent value="pages">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <div key={index} className="bg-card p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  {item.status && <span>{item.status}</span>}
                  {item.views && <span>{item.views} view{item.views > 1 ? 's' : ''}</span>}
                </div>
              </div>
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