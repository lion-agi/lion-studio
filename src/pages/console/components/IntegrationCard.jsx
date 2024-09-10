import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import { Switch } from "@/common/components/ui/switch";
import { Database, Cloud, FileText, Link as LinkIcon, Brain } from 'lucide-react';

const IntegrationCard = ({ integration, onConfigure, onToggle, isActive }) => {
  const getIcon = () => {
    switch (integration.type) {
      case 'database': return <Database className="h-5 w-5 text-gray-400" />;
      case 'cloud': return <Cloud className="h-5 w-5 text-gray-400" />;
      case 'api': return <LinkIcon className="h-5 w-5 text-gray-400" />;
      case 'ai': return <Brain className="h-5 w-5 text-gray-400" />;
      default: return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-100">{integration.name}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <Badge 
          variant={isActive ? 'success' : 'secondary'}
          className={isActive ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
        <p className="text-sm text-gray-400 mt-2">{integration.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onConfigure(integration)}>Configure</Button>
        <Switch 
          checked={isActive}
          onCheckedChange={() => onToggle(integration.id)}
          className={isActive ? 'bg-green-500' : 'bg-gray-500'}
        />
      </CardFooter>
    </Card>
  );
};

export default IntegrationCard;