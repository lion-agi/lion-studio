import React, { useState } from 'react';
import { Switch } from "@/common/components/ui/switch";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { useSettingsStore } from '@/store/settingsSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TableCustomizationSettings = () => {
  const { tableFields, toggleTableField, setTableFieldsOrder } = useSettingsStore();
  const [customFunction, setCustomFunction] = useState('');
  const [error, setError] = useState('');

  const handleCustomFunctionChange = (e) => {
    try {
      new Function(e.target.value);
      setError('');
    } catch (err) {
      setError('Invalid function');
    }
    setCustomFunction(e.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFields = Array.from(tableFields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);
    setTableFieldsOrder(reorderedFields);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tableFields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Object.entries(tableFields).map(([field, isVisible], index) => (
                <Draggable key={field} draggableId={field} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center space-x-4 mb-2"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Switch
                              id={field}
                              checked={isVisible}
                              onCheckedChange={() => toggleTableField(field)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Toggle {field}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Label htmlFor={field} className="capitalize text-lg">{field}</Label>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="customFunction" className="text-lg">Custom Function</Label>
        <Input
          id="customFunction"
          value={customFunction}
          onChange={handleCustomFunctionChange}
          placeholder="Enter custom function"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  );
};

export default TableCustomizationSettings;
