import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Search, Info } from 'lucide-react';
import { useToast } from "@/common/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import SummaryCards from '../components/SummaryCards';
import CostTrendChart from '../components/CostTrendChart';
import CostBreakdownChart from '../components/CostBreakdownChart';
import RecentCallsTable from '../components/RecentCallsTable';
import { useApiData } from '../hooks';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading, error } = useApiData();

  const handleSearch = () => {
    toast({
      title: "Search",
      description: `Searching for: ${searchTerm}`,
    });
    // Implement search functionality here
  };

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error loading dashboard data: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search dashboard..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"
            />
            <Search 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" 
              onClick={handleSearch}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsInfoModalOpen(true)}
            className="text-gray-400 hover:text-gray-100"
          >
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <SummaryCards data={data.summary} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CostTrendChart data={data.costTrend} />
        <CostBreakdownChart data={data.costBreakdown} />
      </div>
      
      <RecentCallsTable calls={data.recentCalls} />

      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Dashboard Information</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>Welcome to your dashboard! Here you can:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>View overall stats and trends</li>
              <li>Monitor API usage and costs</li>
              <li>Check recent API calls</li>
            </ul>
            <p className="mt-4">Use the search bar to quickly find specific information.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;