import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Workflow, Save, Edit, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';

const WorkflowNode = ({ data, isConnectable, selected }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <Card 
      className={`node-card w-83 bg-gradient-to-br from-green-400/20 to-green-300/10 backdrop-blur-sm ${selected ? 'selected' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header bg-green-300/30 relative cursor-pointer" onClick={toggleExpand}>
        <CardTitle className="text-green-foreground font-bold flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Workflow className="w-5 h-5 mr-2" />
            {editedData.label}
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
        <CardContent className="node-content">
          {isEditing ? (
            <>
              <Textarea
                className="node-input mb-2"
                name="config"
                placeholder="Workflow configuration"
                value={editedData.config}
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
            <p className="mb-2"><strong>Workflow Config:</strong> {editedData.config}</p>
          )}
        </CardContent>
      )}
      {!isEditing && (isHovered || selected) && (
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

export default WorkflowNode;