import React from 'react';
import { Card, CardContent } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Eye, Trash2, Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";

const DataSourceItem = ({ dataSource, onOpenModal, onDelete, onEdit }) => {
  return (
    <Card className="bg-gray-800 text-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out animate-fade-in">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-purple-300">{dataSource.name}</h3>
        <p className="text-sm text-gray-300 mb-4 bg-navy-700 bg-opacity-50 p-2 rounded-md">{dataSource.type}</p>
        <div className="space-y-1 text-xs text-gray-400">
          <p><strong>Last Sync:</strong> {dataSource.last_health_check || 'N/A'}</p>
          <p><strong>Health Status:</strong> {dataSource.health_status || 'N/A'}</p>
          <p><strong>Description:</strong> {dataSource.description || 'N/A'}</p>
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

// Path: src/features/library/components/DataSourceItem.jsx