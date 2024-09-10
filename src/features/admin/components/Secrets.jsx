import React from 'react';
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";

const Secrets = ({ secrets, newSecret, setNewSecret, handleAddSecret, handleUpdateSecret, handleDeleteSecret }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">Secrets</h2>
    {secrets.map((secret) => (
      <div key={secret.id} className="flex items-center space-x-4">
        <Input
          value={secret.key}
          onChange={(e) => handleUpdateSecret(secret.id, { ...secret, key: e.target.value })}
          className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
        <Input
          value={secret.value}
          onChange={(e) => handleUpdateSecret(secret.id, { ...secret, value: e.target.value })}
          className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
        <Button onClick={() => handleDeleteSecret(secret.id)} variant="outline" className="hover:bg-gray-800 transition-colors duration-200">
          Delete
        </Button>
      </div>
    ))}
    <div className="flex items-center space-x-4 mt-4">
      <Input
        value={newSecret.key}
        onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
        placeholder="Key"
        className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />
      <Input
        value={newSecret.value}
        onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
        placeholder="Value"
        className="bg-gray-800 text-gray-200 border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
      />
      <Button onClick={handleAddSecret} className="bg-purple-600 hover:bg-purple-700 text-white">
        Add Secret
      </Button>
    </div>
  </div>
);

export default Secrets;



// Path: src/features/admin/components/Secrets.jsx