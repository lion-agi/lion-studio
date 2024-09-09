import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/common/components/ui/collapsible";
import { ChevronDown, ChevronUp, Save, Upload, PlusCircle, FileJson } from 'lucide-react';

const WorkflowOperationsCard = ({ onExportJSON, onSaveLoad, onCreateFlow }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="w-72 fixed top-4 left-4 z-50 shadow-lg">
      <CardHeader className="cursor-pointer flex flex-row items-center justify-between" onClick={toggleExpand}>
        <CardTitle>Workflow Operations</CardTitle>
        <Button variant="ghost" size="sm">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <Collapsible open={isExpanded}>
        <CollapsibleContent>
          <CardContent>
            <div className="space-y-4 mt-4">
              <Button onClick={onExportJSON} className="w-full">
                <FileJson className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
              <Button onClick={onSaveLoad} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save/Load
              </Button>
              <Button onClick={onCreateFlow} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Flow
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default WorkflowOperationsCard;
