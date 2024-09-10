import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const EdgePropertiesDialog = ({ isOpen, onClose, edge, onSave }) => {
  const [edgeData, setEdgeData] = useState({
    label: '',
    type: 'default',
    animated: false,
    style: { stroke: '#000000', strokeWidth: 1 },
  });

  useEffect(() => {
    if (edge) {
      setEdgeData({
        label: edge.label || '',
        type: edge.type || 'default',
        animated: edge.animated || false,
        style: edge.style || { stroke: '#000000', strokeWidth: 1 },
      });
    }
  }, [edge]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdgeData(prev => ({ ...prev, [name]: value }));
  };

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setEdgeData(prev => ({
      ...prev,
      style: { ...prev.style, [name]: value },
    }));
  };

  const handleSave = () => {
    onSave({ ...edge, ...edgeData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Edge Properties</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">Label</Label>
            <Input
              id="label"
              name="label"
              value={edgeData.label}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <Select name="type" value={edgeData.type} onValueChange={(value) => handleInputChange({ target: { name: 'type', value } })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="step">Step</SelectItem>
                <SelectItem value="smoothstep">Smooth Step</SelectItem>
                <SelectItem value="straight">Straight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="animated" className="text-right">Animated</Label>
            <Select name="animated" value={edgeData.animated.toString()} onValueChange={(value) => handleInputChange({ target: { name: 'animated', value: value === 'true' } })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stroke" className="text-right">Stroke Color</Label>
            <Input
              id="stroke"
              name="stroke"
              type="color"
              value={edgeData.style.stroke}
              onChange={handleStyleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="strokeWidth" className="text-right">Stroke Width</Label>
            <Input
              id="strokeWidth"
              name="strokeWidth"
              type="number"
              min="1"
              max="10"
              value={edgeData.style.strokeWidth}
              onChange={handleStyleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EdgePropertiesDialog;