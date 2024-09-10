import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Eye, Trash2, Edit, Clock } from 'lucide-react';

const PageItem = ({ page, onOpenModal, onDelete, onEdit }) => {
  return (
    <Card className="bg-gray-800 text-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-purple-300 truncate">{page.title}</CardTitle>
          <Badge variant="outline" className="ml-2 text-xs">{page.topic || 'Uncategorized'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-300 line-clamp-3">{page.summary || 'No summary available'}</p>
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>Last updated: {new Date(page.updated_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onOpenModal(page)} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onEdit(page)} className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => onDelete(page.id)} className="text-red-300 hover:text-red-100 hover:bg-red-800">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default PageItem;