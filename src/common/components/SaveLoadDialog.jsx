import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const SaveLoadDialog = ({ isOpen, onClose, onSave, onLoad, graphData }) => {
  const [mode, setMode] = useState('save');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [savedGraphs, setSavedGraphs] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState('');
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    const graphs = JSON.parse(localStorage.getItem('savedGraphs') || '[]');
    setSavedGraphs(graphs);
  }, []);

  const handleSave = () => {
    const graphToSave = {
      name,
      description,
      data: graphData,
      timestamp: new Date().toISOString(),
    };
    const updatedGraphs = [...savedGraphs, graphToSave];
    localStorage.setItem('savedGraphs', JSON.stringify(updatedGraphs));
    setSavedGraphs(updatedGraphs);
    onSave(graphToSave);
    onClose();
  };

  const handleLoad = () => {
    if (fileContent) {
      onLoad(fileContent);
    } else if (selectedGraph) {
      const graphToLoad = savedGraphs.find(graph => graph.name === selectedGraph);
      if (graphToLoad) {
        onLoad(graphToLoad.data);
      }
    }
    onClose();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = JSON.parse(e.target.result);
          setFileContent(content);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'save' ? 'Save Graph' : 'Load Graph'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mode" className="text-right">Mode</Label>
            <Select onValueChange={setMode} defaultValue={mode}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="save">Save</SelectItem>
                <SelectItem value="load">Load</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {mode === 'save' ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="loadGraph" className="text-right">Select Graph</Label>
                <Select onValueChange={setSelectedGraph} defaultValue={selectedGraph}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a graph to load" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedGraphs.map((graph) => (
                      <SelectItem key={graph.name} value={graph.name}>
                        {graph.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileUpload" className="text-right">Upload File</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="col-span-3"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={mode === 'save' ? handleSave : handleLoad}>
            {mode === 'save' ? 'Save' : 'Load'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveLoadDialog;