import React, { useState } from 'react';
import { Switch } from "@/common/components/ui/switch";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Button } from "@/common/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/common/components/ui/tooltip";
import { useSettingsStore } from '@/store/settingsSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTable, useSortBy, useColumnOrder } from 'react-table';

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

  const columns = React.useMemo(
    () => Object.entries(tableFields).map(([field, isVisible]) => ({
      Header: field,
      accessor: field,
      show: isVisible,
    })),
    [tableFields]
  );

  const data = React.useMemo(
    () => [],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useColumnOrder
  );

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
      <div>
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCustomizationSettings;
