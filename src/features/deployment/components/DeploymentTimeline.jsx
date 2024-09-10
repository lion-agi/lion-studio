import React from 'react';
import { CheckCircle2, Clock, RefreshCw } from 'lucide-react';

const DeploymentTimeline = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Deployment Timeline</h3>
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="text-green-500" />
        <span>Build completed</span>
        <span className="text-sm text-muted-foreground">2 minutes ago</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="text-yellow-500" />
        <span>Tests running</span>
        <span className="text-sm text-muted-foreground">1 minute ago</span>
      </div>
      <div className="flex items-center space-x-2">
        <RefreshCw className="text-blue-500 animate-spin" />
        <span>Deploying to staging</span>
        <span className="text-sm text-muted-foreground">In progress</span>
      </div>
    </div>
  </div>
);

export default DeploymentTimeline;
