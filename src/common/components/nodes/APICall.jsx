import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Zap } from 'lucide-react';
import { nodeCategories } from './nodeCategories';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";

const APICall = ({ data, isConnectable, selected }) => {
  const [url, setUrl] = useState(data.url || '');
  const [method, setMethod] = useState(data.method || 'GET');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const nodeCategory = nodeCategories.find(category => 
    category.nodes.some(node => node.type === 'apiCall')
  );

  const nodeConfig = nodeCategory.nodes.find(node => node.type === 'apiCall');

  const handleApiCall = async () => {
    try {
      setError(null);
      const res = await fetch(url, { method });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BaseNode 
      icon={Zap} 
      type="apiCall"
      baseColor={nodeConfig.baseColor}
      gradientFrom={nodeConfig.gradientFrom}
      gradientTo={nodeConfig.gradientTo}
      isConnectable={isConnectable}
      selected={selected}
    >
      <div className="p-4 space-y-4">
        <Input
          placeholder="API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full"
        />
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleApiCall} className="w-full">
          Make API Call
        </Button>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        {response && (
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
            {response}
          </pre>
        )}
      </div>
    </BaseNode>
  );
};

export default APICall;