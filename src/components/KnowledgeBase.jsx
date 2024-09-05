import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search } from 'lucide-react';
import CreateCollectionForm from './CreateCollectionForm';
import ThreadList from './ThreadList';
import PageList from './PageList';
import DataSourceList from './DataSourceList';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);

  const threads = [
    // ... (previous thread data)
  ];

  const pages = [
    // ... (previous page data)
  ];

  const dataSources = {
    database: [
      {
        id: 1,
        name: "PostgreSQL",
        type: "Relational Database",
        lastSync: "1 hour ago",
        totalTables: 50,
        usedSpace: "5 GB"
      },
      {
        id: 2,
        name: "MongoDB",
        type: "NoSQL Database",
        lastSync: "30 minutes ago",
        totalCollections: 20,
        usedSpace: "2 GB"
      }
    ],
    cloud: [
      {
        id: 3,
        name: "Google Drive",
        type: "Cloud Storage",
        lastSync: "2 hours ago",
        totalFiles: 1250,
        usedSpace: "15 GB"
      },
      {
        id: 4,
        name: "AWS S3 Bucket",
        type: "Object Storage",
        lastSync: "1 day ago",
        totalFiles: 3750,
        usedSpace: "50 GB"
      }
    ],
    integrations: [
      {
        id: 5,
        name: "Slack",
        type: "Communication Platform",
        lastSync: "5 minutes ago",
        totalChannels: 25,
        totalMessages: "10,000+"
      }
    ]
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
            <CreateCollectionForm onClose={() => setIsCreateCollectionOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="threads">
        <TabsList>
          <TabsTrigger value="threads">Threads</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="dataSources">Data Sources</TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          <ThreadList threads={threads} />
        </TabsContent>
        <TabsContent value="pages">
          <PageList pages={pages} />
        </TabsContent>
        <TabsContent value="dataSources">
          <DataSourceList dataSources={dataSources} />
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