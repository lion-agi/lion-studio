import React from 'react';
import DataSourceItem from './DataSourceItem';

const DataSourceList = ({ dataSources }) => {
  return (
    <div className="space-y-8">
      {Object.entries(dataSources).map(([category, sources]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sources.map((dataSource) => (
              <DataSourceItem key={dataSource.id} dataSource={dataSource} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSourceList;