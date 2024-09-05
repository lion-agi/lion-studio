import React from 'react';
import DataSourceItem from './DataSourceItem';

const DataSourceList = ({ dataSources }) => {
  return (
    <div className="space-y-12">
      {Object.entries(dataSources).map(([category, sources]) => (
        <div key={category} className="space-y-6">
          <h3 className="text-lg font-semibold mb-6 capitalize">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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