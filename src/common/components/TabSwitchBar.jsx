import React from 'react';
import { TabsList, TabsTrigger } from "@/common/components/ui/tabs";

const TabSwitchBar = ({ tabs }) => (
  <TabsList className="bg-gray-800 p-1 rounded-lg">
    {tabs.map((tab) => (
      <TabsTrigger
        key={tab.value}
        value={tab.value}
        className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-colors duration-200"
      >
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>
);

export default TabSwitchBar;


// Path: src/common/components/TabSwitchBar.jsx