import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useUpdateNode } from '@/integrations/supabase/hooks/nodes';

const BaseNode = ({ id, data, isConnectable, selected, icon: Icon, type, baseColor = "blue", gradientFrom = "from-blue-400/20", gradientTo = "to-blue-300/10", iconColor = "text-blue-600", children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const updateNode = useUpdateNode();

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setIsExpanded(true);
  }, []);

  const handleSave = useCallback(() => {
    if (data.onSave) {
      data.onSave(id, editedData);
    } else {
      updateNode.mutate({ id, ...editedData });
    }
    setIsEditing(false);
    // Update the data state to reflect changes immediately
    Object.assign(data, editedData);
  }, [id, editedData, data, updateNode]);

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
    if (typeof data.onDelete === 'function') {
      data.onDelete(id);
    }
  }, [data, id]);

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const displayLabel = data.getDisplayLabel ? data.getDisplayLabel(data.label) : data.label;

  return (
    <Card 
      className={`node-card w-64 bg-gradient-to-br ${gradientFrom} ${gradientTo} backdrop-blur-sm ${selected ? 'selected' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header relative cursor-pointer p-3" onClick={toggleExpand}>
        <CardTitle className={`text-${baseColor}-foreground font-bold flex items-center justify-between text-sm`}>
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 ${iconColor}`} />
            {displayLabel || children}
          </div>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </CardTitle>
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '50%', transform: 'translateY(-50%)', left: '-8px' }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '50%', transform: 'translateY(-50%)', right: '-8px' }}
          isConnectable={isConnectable}
        />
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content p-3">
          {isEditing ? (
            <>
              <Input
                className="node-input mb-2 text-xs h-7 px-2 py-1"
                name="label"
                placeholder="Node label"
                value={editedData.label || ''}
                onChange={handleInputChange}
              />
              <Textarea
                className="node-input mb-2 text-xs px-2 py-1"
                name="description"
                placeholder="Node description"
                value={editedData.description || ''}
                onChange={handleInputChange}
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <Button size="sm" variant="outline" onClick={handleCancel} className="text-xs py-1 h-7">
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="text-xs py-1 h-7">
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-2 text-xs"><strong>Label:</strong> {data.label || children}</p>
              <p className="mb-2 text-xs"><strong>Description:</strong> {data.description || 'No description'}</p>
            </>
          )}
        </CardContent>
      )}
      {!isEditing && (isHovered || selected) && (
        <div className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl">
          <Button variant="ghost" size="icon" onClick={handleEdit} className="h-7 w-7">
            <Edit className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} className="h-7 w-7">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BaseNode;