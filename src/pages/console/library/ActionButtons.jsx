import React from 'react';
import { Button } from "@/common/components/ui/button";
import { MessageSquare, FileText } from 'lucide-react';

const ActionButtons = () => (
  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
    <Button variant="secondary" className="text-gray-200 bg-gray-800 hover:bg-gray-700 flex items-center">
      <MessageSquare className="h-4 w-4 mr-2" />
      Thread
    </Button>
    <Button variant="secondary" className="text-gray-200 bg-gray-800 hover:bg-gray-700 flex items-center">
      <FileText className="h-4 w-4 mr-2" />
      Page
    </Button>
  </div>
);

export default ActionButtons;