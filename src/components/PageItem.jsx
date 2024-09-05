import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from 'lucide-react';

const PageItem = ({ page }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{page.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{page.content}</p>
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <span>{page.createdAt}</span>
          <span className="mx-2">•</span>
          <span>{page.collection}</span>
          <span className="mx-2">•</span>
          <span>{page.views} views</span>
          <span className="mx-2">•</span>
          <span>{page.timeToRead}</span>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageItem;