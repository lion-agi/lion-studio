import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { Eye, Trash2, Edit, Clock, User } from 'lucide-react';

const PageItem = ({ page, onOpenModal, onDelete, onEdit }) => {
  const truncate = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="bg-gray-800 text-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-purple-300">{page.title}</CardTitle>
        <div className="flex items-center text-xs text-gray-400 space-x-2">
          <Clock className="h-3 w-3" />
          <span>Last activity: {formatDate(page.last_activity_at)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300 mb-4">{truncate(page.content, 100)}</p>
        <Badge variant="outline" className="text-xs">
          {page.topic}
        </Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <Badge variant={page.is_active ? 'success' : 'secondary'}>
          {page.is_active ? 'Active' : 'Inactive'}
        </Badge>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => onOpenModal(page)}>
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
                <Button variant="ghost" size="sm" onClick={() => onEdit(page)}>
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
                <Button variant="ghost" size="sm" onClick={() => onDelete(page.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PageItem;