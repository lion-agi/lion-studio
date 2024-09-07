import React from 'react';
import { Card, CardContent } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Eye, Trash2, Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Badge } from "@/common/components/ui/badge";

const mockTypeNames = {
  1: 'SQL Database',
  2: 'NoSQL Database',
  3: 'REST API',
  4: 'GraphQL API',
  5: 'File Storage',
  6: 'Message Queue',
  7: 'Search Engine',
  8: 'Cache',
  9: 'Blockchain',
  10: 'IoT Device'
};

const DataSourceItem = ({ dataSource, onOpenModal, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <Card className="bg-gray-800 text-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-purple-300">{dataSource.name}</h3>
          <Badge variant="outline" className="text-xs">
            {mockTypeNames[dataSource.type_id] || 'Unknown Type'}
          </Badge>
        </div>
        <p className="text-sm text-gray-300 mb-4 bg-navy-700 bg-opacity-50 p-2 rounded-md">{dataSource.description}</p>
        <div className="space-y-1 text-xs text-gray-400">
          <p><strong>Last Sync:</strong> {formatDate(dataSource.last_sync)}</p>
          <p><strong>Health Status:</strong> {dataSource.health_status || 'N/A'}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onOpenModal(dataSource)} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Data Source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onEdit(dataSource.id)} className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Data Source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onDelete(dataSource.id)} className="text-red-300 hover:text-red-100 hover:bg-red-800">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Data Source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceItem;