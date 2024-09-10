import React from 'react';
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components/ui/button";

const NodeForm = ({ data, onChange, onSave, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-sm font-medium mb-1">Label</label>
        <Input
          id="label"
          name="label"
          value={data.label || ''}
          onChange={handleChange}
          className="w-full"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          id="description"
          name="description"
          value={data.description || ''}
          onChange={handleChange}
          className="w-full"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default NodeForm;