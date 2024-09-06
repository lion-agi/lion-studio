import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PageItem = ({ page, onOpenModal, onDelete, onEdit }) => {
  return (
    <Card className="bg-gradient-to-br from-navy-900 to-navy-800 text-white hover:shadow-lg transition-all duration-300 ease-in-out animate-fade-in">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-purple-300">{page.title}</h3>
        <p className="text-sm text-gray-300 mb-4 bg-navy-700 bg-opacity-50 p-2 rounded-md">{page.content.substring(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">{new Date(page.created_at).toLocaleDateString()}</span>
          <div className="space-x-2">
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
                  <Button variant="ghost" size="sm" onClick={() => onEdit(page.id)} className="text-blue-300 hover:text-blue-100 hover:bg-blue-800">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageItem;