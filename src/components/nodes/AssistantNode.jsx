import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Zap, Edit, Trash2, Save, X } from 'lucide-react';

const AssistantNode = ({ data, isConnectable }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setIsExpanded(true);
  }, []);

  const handleSave = useCallback(() => {
    if (data.onSave) {
      data.onSave(editedData);
    }
    setIsEditing(false);
    setIsExpanded(false);
  }, [editedData, data]);

  const handleCancel = useCallback(() => {
    setEditedData({ ...data });
    setIsEditing(false);
    setIsExpanded(false);
  }, [data]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDelete = useCallback(() => {
    if (data.onDelete) {
      data.onDelete(data.id);
    }
  }, [data]);

  const toggleExpand = useCallback(() => {
    if (!isEditing) {
      setIsExpanded(!isExpanded);
    }
  }, [isEditing, isExpanded]);

  return (
    <Card className={`node-card w-64 bg-gradient-to-br from-accent-200 to-accent-100 ${isExpanded ? 'expanded' : ''}`}>
      <CardHeader className="node-header bg-accent-300 relative" onClick={toggleExpand}>
        <CardTitle className="text-accent-foreground font-bold flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          {editedData.label}
        </CardTitle>
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '50%', transform: 'translateY(-50%)', left: '-6px' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '50%', transform: 'translateY(-50%)', right: '-6px' }}
          isConnectable={isConnectable}
        />
      </CardHeader>
      <CardContent className={`node-content ${isExpanded ? '' : 'hidden'}`}>
        {isEditing ? (
          <>
            <Input
              className="node-input mb-2"
              name="label"
              placeholder="Assistant name"
              value={editedData.label}
              onChange={handleInputChange}
            />
            <Textarea
              className="node-input mb-2"
              name="description"
              placeholder="Description"
              value={editedData.description}
              onChange={handleInputChange}
            />
            <Input
              className="node-input mb-2"
              name="model"
              placeholder="Model"
              value={editedData.model}
              onChange={handleInputChange}
            />
            <Input
              className="node-input mb-2"
              name="temperature"
              type="number"
              placeholder="Temperature"
              value={editedData.temperature}
              onChange={handleInputChange}
            />
            <Input
              className="node-input mb-2"
              name="maxTokens"
              type="number"
              placeholder="Max Tokens"
              value={editedData.maxTokens}
              onChange={handleInputChange}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-2"><strong>Description:</strong> {editedData.description}</p>
            <p className="mb-2"><strong>Model:</strong> {editedData.model}</p>
            <p className="mb-2"><strong>Temperature:</strong> {editedData.temperature}</p>
            <p className="mb-2"><strong>Max Tokens:</strong> {editedData.maxTokens}</p>
            <Button size="sm" className="node-button">
              <Zap className="w-4 h-4 mr-2" />
              Train
            </Button>
          </>
        )}
      </CardContent>
      {!isEditing && (
        <div className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl">
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AssistantNode;