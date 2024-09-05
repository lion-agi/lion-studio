import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search } from 'lucide-react';
import ThreadItem from './ThreadItem';

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
      title: "using pydantic, how to use annotated and field as function parameter",
      content: "To use Pydantic's Annotated and Field as function parameters, you can combine them to create validated and documented function arguments. Here's how to do it: 1. Import the...",
      createdAt: "27 days ago",
      collection: "agentic",
      views: 0,
      timeToRead: "1mo"
    },
    {
      id: 2,
      title: "how to run a startup script .sh file in macos terminal",
      content: "To run a startup script (.sh file) in macOS Terminal, you have a few options: 1. Add the script to your login items: Go to System Preferences > Users & Groups Select your user...",
      createdAt: "29 days ago",
      collection: "agentic",
      views: 0,
      timeToRead: "1mo"
    },
    {
      id: 3,
      title: "in graph theory, after a hyperedge is formed, is it academically correct for the hyper ed...",
      content: "Yes, in graph theory, it is academically correct for a hyperedge to connect to more nodes after it is initially formed. This flexibility is one of the key features that distinguishes...",
      createdAt: "1 month ago",
      collection: "agentic",
      views: 0,
      timeToRead: "1mo"
    },
    {
      id: 4,
      title: "how to hide pydantic model attributes",
      content: "To hide Pydantic model attributes, there are a few approaches you can take: 1. Use private attributes with underscore prefixes: from pydantic import BaseModel class...",
      createdAt: "1 month ago",
      collection: "agentic",
      views: 0,
      timeToRead: "1mo"
    },
    {
      id: 5,
      title: "pending",
      content: "Based on the search result provided, I can offer information about the word \"pending\" and its usage: \"Pending\" is a commonly used term that generally refers to something that is n...",
      createdAt: "1 month ago",
      collection: "agentic",
      views: 0,
      timeToRead: "1mo"
    },
    {
      id: 6,
      title: "how to use pydantic parent class to create child class via pydantic mor?",
      content: "To use a Pydantic parent class to create a child class via Pydantic, you can follow these steps: 1. Define the parent class using Pydantic's BaseModel: from pydantic import BaseModel...",
      createdAt: "1 month ago",
      collection: "agentic",
      views: 0,
      timeToRead: "1mo"
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
        <TabsContent value="pages">Pages content</TabsContent>
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