import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const AgenticFlowWizard = ({ isOpen, onClose, onCreateFlow }) => {
  const [step, setStep] = useState(1);
  const [flowType, setFlowType] = useState('');
  const [flowName, setFlowName] = useState('');
  const [flowDescription, setFlowDescription] = useState('');

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleCreate = () => {
    onCreateFlow({ type: flowType, name: flowName, description: flowDescription });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Agentic Flow - Step {step}</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="flowType" className="text-right">Flow Type</Label>
              <Select onValueChange={setFlowType} value={flowType}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select flow type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Data Preprocessing">Data Preprocessing</SelectItem>
                  <SelectItem value="Model Execution">Model Execution</SelectItem>
                  <SelectItem value="Conditional Branching">Conditional Branching</SelectItem>
                  <SelectItem value="Iterative Processing">Iterative Processing</SelectItem>
                  <SelectItem value="Parallel Processing">Parallel Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="flowName" className="text-right">Flow Name</Label>
              <Input
                id="flowName"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="flowDescription" className="text-right">Description</Label>
              <Input
                id="flowDescription"
                value={flowDescription}
                onChange={(e) => setFlowDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          {step > 1 && <Button onClick={handleBack}>Back</Button>}
          {step < 2 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleCreate}>Create Flow</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgenticFlowWizard;
