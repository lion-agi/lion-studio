import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DataSourceModal = ({ dataSource, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{dataSource.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 flex-grow overflow-auto">
          <p className="text-sm text-gray-600">Data source details and statistics</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <strong>Type:</strong> {dataSource.type}
            </div>
            <div>
              <strong>Last Sync:</strong> {dataSource.lastSync}
            </div>
            <div>
              <strong>Total Tables/Collections:</strong> {dataSource.totalTables || dataSource.totalCollections}
            </div>
            <div>
              <strong>Used Space:</strong> {dataSource.usedSpace}
            </div>
            <div>
              <strong>Connection Status:</strong> Active
            </div>
            <div>
              <strong>API Endpoint:</strong> https://api.example.com/v1/
            </div>
            <div>
              <strong>Last Error:</strong> None
            </div>
            <div>
              <strong>Data Refresh Rate:</strong> Every 6 hours
            </div>
            <div>
              <strong>Access Level:</strong> Read/Write
            </div>
            <div>
              <strong>Data Schema:</strong> JSON
            </div>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DataSourceModal;