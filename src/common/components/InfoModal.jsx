import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";

const InfoModal = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
      <DialogHeader>
        <DialogTitle>Dashboard Information</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p>The Dashboard is your central hub for monitoring and managing your project:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Overview: Overall stats of the project</li>
          <li>Costs: Costs related stats for the project</li>
          <li>API Calls: Provide detailed logs of recent API calls</li>
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);

export default InfoModal;
