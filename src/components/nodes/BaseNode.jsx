import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const BaseNode = ({ data, isConnectable, selected, icon: Icon, type }) => {
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
      className={`node-card w-64 bg-gradient-to-br from-${type}-200 to-${type}-100 ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header relative cursor-pointer p-3" onClick={toggleExpand}>
        <CardTitle className={`text-${type}-foreground font-bold flex items-center justify-between text-sm`}>
          <div className="flex items-center">
            <Icon className="w-4 h-4 mr-2" />
            {data.label}
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
        <CardContent className="node-content text-xs space-y-3 p-3">
          {isEditing ? (
            <>
              {Object.entries(editedData).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-xs font-medium">{key}:</label>
                  {typeof value === 'string' ? (
                    <Input
                      className="node-input text-xs h-7 px-2 py-1 border border-accent-300"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <Textarea
                      className="node-input text-xs px-2 py-1 border border-accent-300"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end space-x-2 mt-3">
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
              {Object.entries(editedData).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <p className="font-medium">{key}:</p>
                  <p className="border border-accent-300 rounded px-2 py-1">{value}</p>
                </div>
              ))}
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