import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/common/components/ui/tabs";

const Deployment = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Deployment</h1>
      <Tabs defaultValue="workers">
        <TabsList>
          <TabsTrigger value="workers" asChild>
            <Link to="workers">Worker Management</Link>
          </TabsTrigger>
          <TabsTrigger value="jobs" asChild>
            <Link to="jobs">Job Management</Link>
          </TabsTrigger>
          <TabsTrigger value="cron" asChild>
            <Link to="cron">Cron and Schedule</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet />
    </div>
  );
};

export default Deployment;