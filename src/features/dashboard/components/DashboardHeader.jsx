import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { timeRangeState, selectedModelState } from '../atoms';
import { Search, Info } from 'lucide-react';
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

const DashboardHeader = () => {
  const [timeRange, setTimeRange] = useRecoilState(timeRangeState);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-100 mr-4">Dashboard</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsInfoModalOpen(true)}
            className="text-gray-400 hover:text-gray-100"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[180px] bg-gray-800 text-gray-200 border-gray-700">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="gpt-3">GPT-3</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Dashboard Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>The Dashboard provides an overview of your project's performance and usage:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>View total costs and API calls</li>
              <li>Monitor response times and error rates</li>
              <li>Analyze trends and performance metrics</li>
            </ul>
            <p className="mt-4">Use the filters to adjust the time range and model selection, and use the search bar to find specific information.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardHeader;