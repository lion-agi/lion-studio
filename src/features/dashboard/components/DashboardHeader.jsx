import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { timeRangeState, selectedModelState } from '../atoms';
import { Info } from 'lucide-react';
import { Button } from "@/common/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";

const InfoModal = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
      <DialogHeader>
        <DialogTitle>Dashboard Information</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p>The Library is your central hub for monitoring and managing your project:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Overview: Overall stats of the project</li>
          <li>Costs: costs related stats for the project</li>
          <li>API Calls: provide detailed logs of recent API calls</li>
        </ul>
      </div>
    </DialogContent>
  </Dialog>
);


const DashboardHeader = () => {
  const [timeRange, setTimeRange] = useRecoilState(timeRangeState);
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
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
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[180px]">
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
      <div className="flex space-x-4">
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">Overview</Button>
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">Costs</Button>
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700">API Calls</Button>
      </div>
      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </div>
  );
};

export default DashboardHeader;