import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card"
import { Button } from "@/common/components/ui/button"
import { Input } from "@/common/components/ui/input"
import { Textarea } from "@/common/components/ui/textarea"
import { Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { nodeCategories } from './nodeCategories';

const BaseNode = ({ 
  data, 
  isConnectable, 
  selected, 
  icon: Icon, 
  type,
  children 
}) => {
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
      data.onSave(data.id, editedData);
    }
    setIsEditing(false);
  }, [data, editedData]);

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
    setIsExpanded(prev => !prev);
  }, []);

  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === type)
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === type);

  return (
    <Card 
      className={`node-card w-64 bg-gradient-to-br ${nodeConfig.gradientFrom} ${nodeConfig.gradientTo} backdrop-blur-sm ${selected ? `ring-2 ring-${nodeConfig.baseColor}-400 ring-opacity-50` : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header relative cursor-pointer p-3" onClick={toggleExpand}>
        <CardTitle className={`text-${nodeConfig.baseColor}-100 font-bold flex items-center justify-between text-sm`}>
          <div className="flex items-center">
            <Icon className={`w-4 h-4 mr-2 text-${nodeConfig.baseColor}-100`} />
            {children}
          </div>
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </CardTitle>
        <Handle
          type="target"
          position={Position.Left}
          style={{ 
            left: '-8px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            width: '12px', 
            height: '12px',
            background: `var(--${nodeConfig.baseColor}-400)`
          }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ 
            right: '-8px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            width: '12px', 
            height: '12px',
            background: `var(--${nodeConfig.baseColor}-400)`
          }}
          isConnectable={isConnectable}
        />
      </CardHeader>
      {isExpanded && (
        <CardContent className="node-content p-3">
          {isEditing ? (
            <>
              <Input
                className={`node-input mb-2 text-xs h-7 px-2 py-1 bg-${nodeConfig.baseColor}-800 text-${nodeConfig.baseColor}-100 border-${nodeConfig.baseColor}-600`}
                name="label"
                placeholder="Node label"
                value={editedData.label || ''}
                onChange={handleInputChange}
              />
              <Textarea
                className={`node-input mb-2 text-xs px-2 py-1 bg-${nodeConfig.baseColor}-800 text-${nodeConfig.baseColor}-100 border-${nodeConfig.baseColor}-600`}
                name="description"
                placeholder="Node description"
                value={editedData.description || ''}
                onChange={handleInputChange}
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <Button size="sm" variant="outline" onClick={handleCancel} className={`text-xs py-1 h-7 bg-${nodeConfig.baseColor}-700 text-${nodeConfig.baseColor}-100 border-${nodeConfig.baseColor}-600 hover:bg-${nodeConfig.baseColor}-600`}>
                  <X className="w-3 h-3 mr-1" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className={`text-xs py-1 h-7 bg-${nodeConfig.baseColor}-600 text-${nodeConfig.baseColor}-100 hover:bg-${nodeConfig.baseColor}-500`}>
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className={`mb-2 text-xs text-${nodeConfig.baseColor}-100`}><strong>Label:</strong> {data.label || children}</p>
              <p className={`mb-2 text-xs text-${nodeConfig.baseColor}-200`}><strong>Description:</strong> {editedData.description || 'No description'}</p>
            </>
          )}
        </CardContent>
      )}
      {!isEditing && (isHovered || selected) && (
        <div className="absolute top-0 right-0 p-1 bg-background/80 rounded-bl">
          <Button variant="ghost" size="icon" onClick={handleEdit} className={`h-7 w-7 text-${nodeConfig.baseColor}-100 hover:bg-${nodeConfig.baseColor}-700`}>
            <Edit className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} className={`h-7 w-7 text-${nodeConfig.baseColor}-100 hover:bg-${nodeConfig.baseColor}-700`}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BaseNode;
