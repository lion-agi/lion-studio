import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw } from 'lucide-react';

const DataSourceItem = ({ dataSource }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{dataSource.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{dataSource.type}</p>
        <div className="space-y-1 text-sm">
          <p><strong>Last Sync:</strong> {dataSource.lastSync}</p>
          <p><strong>Total Files:</strong> {dataSource.totalFiles.toLocaleString()}</p>
          <p><strong>Used Space:</strong> {dataSource.usedSpace}</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceItem;