import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Switch } from "@/common/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useSettingsStore from '@/store/settingsSlice';

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

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;

    const items = Object.entries(tableFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedFields = Object.fromEntries(items);
    setTableFieldsOrder(reorderedFields);
  }, [tableFields, setTableFieldsOrder]);

  return (
    <Card className="bg-gray-800 text-white mt-8 border border-gray-700 rounded-lg shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Table Customization</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <DragDropContext onDragEnd={onDragEnd}>
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
        <div className="flex flex-col space-y-2 mt-4">
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
      </CardContent>
    </Card>
  );
};

export default TableCustomizationSettings;