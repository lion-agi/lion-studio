import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { getNodeStyle, getHeaderStyle, getContentStyle } from '../../styles/nodeStyles';

const GroupNode = ({ data, isConnectable, selected }) => {
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

  const nodeStyle = getNodeStyle('group', selected);
  const headerStyle = getHeaderStyle('group');
  const contentStyle = getContentStyle();

  return (
    <Card 
      className="w-64 overflow-hidden"
      style={nodeStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="cursor-pointer" style={headerStyle} onClick={toggleExpand}>
        <CardTitle className="text-white font-bold flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-6 h-6 mr-2" />
            {editedData.label}
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent style={contentStyle}>
          {isEditing ? (
            <>
              <Input
                className="mb-2"
                name="label"
                placeholder="Group name"
                value={editedData.label}
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
              <p className="mb-2"><strong>Group Name:</strong> {editedData.label}</p>
              <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Members
              </Button>
            </>
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
    </Card>
  );
};

export default GroupNode;