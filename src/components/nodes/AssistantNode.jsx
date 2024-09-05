import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Zap, Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const AssistantNode = ({ data, isConnectable, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedData, setEditedData] = useState({
    label: data.label || 'Assistant',
    description: data.description || 'A helpful AI assistant',
    model: data.model || 'openai/gpt-4',
    temperature: data.temperature || 0.7,
    maxTokens: data.maxTokens || 1500,
    ...data
  });

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setIsExpanded(true);
  }, []);

  const handleSave = useCallback(() => {
    if (data.onSave) {
      data.onSave(editedData);
    }
    setIsEditing(false);
  }, [editedData, data]);

  const handleCancel = useCallback(() => {
    setEditedData({
      label: data.label || 'Assistant',
      description: data.description || 'A helpful AI assistant',
      model: data.model || 'openai/gpt-4',
      temperature: data.temperature || 0.7,
      maxTokens: data.maxTokens || 1500,
      ...data
    });
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
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <Card 
      className={`node-card w-64 bg-gradient-to-br from-accent-200 to-accent-100 ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header relative cursor-pointer p-2" onClick={toggleExpand}>
        <CardTitle className="text-accent-foreground font-bold flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Bot className="w-4 h-4 mr-2" />
            Assistant
          </div>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
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
      {isExpanded && (
        <CardContent className="node-content text-xs space-y-2 p-2">
          {isEditing ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-medium">Name:</label>
                <Input
                  className="node-input text-xs h-6 px-1 py-0 border border-accent-300"
                  name="label"
                  value={editedData.label}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Description:</label>
                <Textarea
                  className="node-input text-xs px-1 py-0 border border-accent-300"
                  name="description"
                  value={editedData.description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Model:</label>
                <Input
                  className="node-input text-xs h-6 px-1 py-0 border border-accent-300"
                  name="model"
                  value={editedData.model}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Temperature:</label>
                <Input
                  className="node-input text-xs h-6 px-1 py-0 border border-accent-300"
                  name="temperature"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={editedData.temperature}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Max Tokens:</label>
                <Input
                  className="node-input text-xs h-6 px-1 py-0 border border-accent-300"
                  name="maxTokens"
                  type="number"
                  value={editedData.maxTokens}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-1 mt-2">
                <Button size="sm" variant="outline" onClick={handleCancel} className="text-xs py-0 h-6">
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="text-xs py-0 h-6">
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <p className="font-medium">Name:</p>
                <p className="border border-accent-300 rounded px-1 py-0">{editedData.label}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Description:</p>
                <p className="border border-accent-300 rounded px-1 py-0">{editedData.description}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Model:</p>
                <p className="border border-accent-300 rounded px-1 py-0">{editedData.model}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Temperature:</p>
                <p className="border border-accent-300 rounded px-1 py-0">{editedData.temperature}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Max Tokens:</p>
                <p className="border border-accent-300 rounded px-1 py-0">{editedData.maxTokens}</p>
              </div>
              <Button size="sm" className="node-button text-xs w-full py-0 h-6 mt-2">
                <Zap className="w-3 h-3 mr-1" />
                Train
              </Button>
            </>
          )}
        </CardContent>
      )}
      {!isEditing && (isHovered || selected) && (
        <div className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl">
          <Button variant="ghost" size="icon" onClick={handleEdit} className="h-6 w-6">
            <Edit className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} className="h-6 w-6">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AssistantNode;