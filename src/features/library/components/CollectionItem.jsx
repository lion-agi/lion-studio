import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Eye, Trash2, Edit, Clock } from 'lucide-react';
import commonStyles from '@/common/components/ui/style-guide';

const CollectionItem = ({ collection, onOpenModal, onDelete, onEdit }) => {
  return (
    <Card className="bg-gray-800 text-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out" style={commonStyles}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-purple-300 truncate">{collection.title}</CardTitle>
          <Badge variant="outline" className="ml-2 text-xs">Collection</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-300 line-clamp-3">{collection.description || 'No description available'}</p>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last updated: {new Date(collection.updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onOpenModal(collection)} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onEdit(collection)} className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onDelete(collection.id)} className="text-red-300 hover:text-red-100 hover:bg-red-800">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Collection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default CollectionItem;

// Path: src/features/library/components/CollectionItem.jsx