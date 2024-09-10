import React, { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card"
import { Button } from "@/common/components/ui/button"
import { Edit, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { nodeCategories } from './nodeCategories';
import NodeContent from './NodeContent';
import NodeForm from './NodeForm';

const BaseNode = ({ 
  data = {}, 
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

  const nodeConfig = nodeCategory?.nodes.find(node => node.type === type) || {};

  return (
    <Card 
      className={`node-card w-64 bg-gradient-to-br ${nodeConfig.gradientFrom} ${nodeConfig.gradientTo} backdrop-blur-sm ${selected ? `ring-2 ring-${nodeConfig.baseColor}-400 ring-opacity-50` : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="node-header relative cursor-pointer p-3" onClick={toggleExpand}>
        <CardTitle className={`text-${nodeConfig.baseColor}-100 font-bold flex items-center justify-between text-sm`}>
          <div className="flex items-center">
            {Icon && <Icon className={`w-4 h-4 mr-2 text-${nodeConfig.baseColor}-100`} />}
            {data.label || children || 'Unnamed Node'}
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
            <NodeForm
              data={editedData}
              onChange={setEditedData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <NodeContent data={data} />
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