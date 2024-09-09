import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";

const DeploymentCard = ({ name, environment, status, lastDeployed, version }) => {
  const statusColors = {
    'Success': 'bg-green-500',
    'Failed': 'bg-red-500',
    'In Progress': 'bg-yellow-500',
    'Idle': 'bg-gray-500'
  };

  return (
    <Card className="bg-gray-800 hover:bg-card/90 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant="outline">{environment}</Badge>
        </div>
        <CardDescription>Version: {version}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
          <span>{status}</span>
        </div>
        <p className="text-sm text-muted-foreground">Last deployed: {lastDeployed}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">View Logs</Button>
        <Button variant="default" size="sm">Redeploy</Button>
      </CardFooter>
    </Card>
  );
};

export default DeploymentCard;


// Path: src/features/deployment/components/DeploymentCard.jsx