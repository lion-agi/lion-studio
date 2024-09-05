import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WizardDialog = ({ isOpen, onClose, onAddNode, nodeType }) => {
  const [nodeData, setNodeData] = useState({
    name: '',
    type: nodeType || '',
    llmSettings: {
      modelName: '',
      temperature: 0.7,
      maxTokens: 100,
    },
    agentConfig: {
      role: '',
      capabilities: '',
    },
    tools: [],
  });

  const handleInputChange = (category, field, value) => {
    setNodeData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleFinish = () => {
    onAddNode(nodeData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Node</DialogTitle>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>
                <Input
                  value={nodeData.name}
                  onChange={(e) => setNodeData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Node name"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Type</TableCell>
              <TableCell>
                <Select
                  value={nodeData.type}
                  onValueChange={(value) => setNodeData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select node type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="user">Human User</SelectItem>
                    <SelectItem value="group">Mixture Of Experts</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="initializer">Start</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Model Name</TableCell>
              <TableCell>
                <Select
                  value={nodeData.llmSettings.modelName}
                  onValueChange={(value) => handleInputChange('llmSettings', 'modelName', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Temperature</TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={nodeData.llmSettings.temperature}
                  onChange={(e) => handleInputChange('llmSettings', 'temperature', parseFloat(e.target.value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Max Tokens</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={nodeData.llmSettings.maxTokens}
                  onChange={(e) => handleInputChange('llmSettings', 'maxTokens', parseInt(e.target.value))}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Role</TableCell>
              <TableCell>
                <Input
                  value={nodeData.agentConfig.role}
                  onChange={(e) => handleInputChange('agentConfig', 'role', e.target.value)}
                  placeholder="Agent role"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Capabilities</TableCell>
              <TableCell>
                <Textarea
                  value={nodeData.agentConfig.capabilities}
                  onChange={(e) => handleInputChange('agentConfig', 'capabilities', e.target.value)}
                  placeholder="Agent capabilities"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button onClick={handleFinish}>Add Node</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WizardDialog;