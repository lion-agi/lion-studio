import React from 'react';
import DataSourceItem from './DataSourceItem';

const DataSourceList = ({ dataSources }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {dataSources.map((dataSource) => (
        <DataSourceItem key={dataSource.id} dataSource={dataSource} />
      ))}
    </div>
  );
};

export default DataSourceList;