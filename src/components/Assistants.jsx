import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Trash2, ExternalLink, Copy } from 'lucide-react';

const Assistants = () => {
  const assistants = [
    { name: "Coder Assistant", id: "asst_2pcf40RB2RXLaMAnyS1OSARM", date: "6 months ago, Mar 25", time: "12:18 PM" },
    { name: "Coder Assistant", id: "asst_Q0YCQRqRzxUr9MOMinBZa6p", date: "7 months ago, Feb 7", time: "1:07 PM" },
    { name: "Coder Assistant", id: "asst_dboISjPIAyYuLAAVSLM5cWu", date: "8 months ago, Jan 7", time: "3:58 PM" },
    { name: "Coder Assistant", id: "asst_eSP9vEkuFTXNN748rmJ5fIv", date: "Last year, Dec 18", time: "7:36 PM" },
    { name: "lion_api", id: "asst_PNHb4gmedW9kWb0OU2aGnOY", date: "Last year, Nov 22", time: "11:44 AM" },
    { name: "lion builder", id: "asst_faOQkxVgP7RJS80fuqZxA6F1", date: "Last year, Nov 7", time: "1:01 PM" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assistants</h1>
        <Button className="bg-green-500 hover:bg-green-600 text-white">+ Create</Button>
      </div>

      <div className="space-y-4">
        {assistants.map((assistant, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {assistant.name}
              </CardTitle>
              <div className="text-xs text-gray-500">{assistant.time}</div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-2">{assistant.id}</p>
              <p className="text-xs text-gray-400">{assistant.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">ASSISTANT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-1">Name</h3>
              <Input value="Coder Assistant" className="w-full" />
              <p className="text-xs text-gray-500 mt-1">asst_2pcf40RB2RXLaMAnyS1OSARM</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Instructions</h3>
              <textarea className="w-full h-32 p-2 border rounded" defaultValue="You are an expert at writing python codes.&#10;1. Write pure python codes, and&#10;2. run it to validate the codes" />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Model</h3>
              <Input value="gpt-4-turbo-preview" className="w-full" />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">TOOLS</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">File search</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Code interpreter</span>
                <Switch />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Functions</h3>
              <Button variant="outline" className="w-full justify-start">
                + Functions
              </Button>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">MODEL CONFIGURATION</h3>
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-medium">Response format</h4>
                  <Input value="text" className="w-full" />
                </div>
                <div>
                  <h4 className="text-xs font-medium">Temperature</h4>
                  <Slider defaultValue={[1]} max={1} step={0.1} className="w-full" />
                </div>
                <div>
                  <h4 className="text-xs font-medium">Top P</h4>
                  <Slider defaultValue={[1]} max={1} step={0.1} className="w-full" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">API VERSION</h3>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Copy className="w-4 h-4 mr-2" />
                  Clone
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistants;