import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw } from 'lucide-react';

const DataSourceItem = ({ dataSource, onOpenModal }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{dataSource.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{dataSource.type}</p>
        <div className="space-y-1 text-sm">
          <p><strong>Last Sync:</strong> {dataSource.lastSync}</p>
          {dataSource.totalTables && <p><strong>Total Tables:</strong> {dataSource.totalTables}</p>}
          {dataSource.totalCollections && <p><strong>Total Collections:</strong> {dataSource.totalCollections}</p>}
          {dataSource.totalFiles && <p><strong>Total Files:</strong> {dataSource.totalFiles.toLocaleString()}</p>}
          {dataSource.totalChannels && <p><strong>Total Channels:</strong> {dataSource.totalChannels}</p>}
          {dataSource.totalMessages && <p><strong>Total Messages:</strong> {dataSource.totalMessages}</p>}
          {dataSource.usedSpace && <p><strong>Used Space:</strong> {dataSource.usedSpace}</p>}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="ghost" size="sm" onClick={() => onOpenModal(dataSource)}>
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