import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Textarea } from "@/common/components/ui/textarea";
import { ScrollArea } from "@/common/components/ui/scroll-area";

const VariableManipulationModal = ({ isOpen, onClose }) => {
  const [variables, setVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');

  const handleAddVariable = () => {
    setVariables([...variables, { name: variableName, value: variableValue }]);
    setVariableName('');
    setVariableValue('');
  };

  const handleEditVariable = (index) => {
    const updatedVariables = variables.map((variable, i) => 
      i === index ? { name: variableName, value: variableValue } : variable
    );
    setVariables(updatedVariables);
    setSelectedVariable(null);
    setVariableName('');
    setVariableValue('');
  };

  const handleDeleteVariable = (index) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
  };

  const handleSelectVariable = (index) => {
    setSelectedVariable(index);
    setVariableName(variables[index].name);
    setVariableValue(variables[index].value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Variable Manipulation</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="variableName">Name</Label>
              <Input
                id="variableName"
                value={variableName}
                onChange={(e) => setVariableName(e.target.value)}
                className="flex-grow"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="variableValue">Value</Label>
              <Textarea
                id="variableValue"
                value={variableValue}
                onChange={(e) => setVariableValue(e.target.value)}
                className="flex-grow"
              />
            </div>
            <div className="flex justify-end space-x-2">
              {selectedVariable !== null ? (
                <Button onClick={() => handleEditVariable(selectedVariable)}>Edit Variable</Button>
              ) : (
                <Button onClick={handleAddVariable}>Add Variable</Button>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Variables</h3>
              <ul className="space-y-2">
                {variables.map((variable, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
                    <div>
                      <p className="font-medium">{variable.name}</p>
                      <p className="text-sm text-gray-400">{variable.value}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleSelectVariable(index)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteVariable(index)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VariableManipulationModal;
