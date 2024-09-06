import React, { useState } from 'react';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const CreateCollectionForm = ({ onClose }) => {
  const [newCollection, setNewCollection] = useState({
    title: '',
    emoji: '',
    description: '',
    aiPrompt: '',
    privacy: 'Shareable'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollection(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    console.log('Creating collection:', newCollection);
    onClose();
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="title" className="text-right">Title</label>
        <Input
          id="title"
          name="title"
          value={newCollection.title}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder="Vacation Planning"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="emoji" className="text-right">Emoji</label>
        <Input
          id="emoji"
          name="emoji"
          value={newCollection.emoji}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder="+"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="description" className="text-right">Description</label>
        <Textarea
          id="description"
          name="description"
          value={newCollection.description}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder="Planning a trip to Europe"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="aiPrompt" className="text-right">AI Prompt</label>
        <Textarea
          id="aiPrompt"
          name="aiPrompt"
          value={newCollection.aiPrompt}
          onChange={handleInputChange}
          className="col-span-3"
          placeholder="You are a travel agent. Help me plan my trip around boutique hotels, local food, and museums."
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="privacy" className="text-right">Privacy</label>
        <Select
          value={newCollection.privacy}
          onValueChange={(value) => setNewCollection(prev => ({ ...prev, privacy: value }))}
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
      <Button onClick={handleCreate}>Create</Button>
    </div>
  );
};

export default CreateCollectionForm;