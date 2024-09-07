import React from 'react';
import DataSourceItem from './DataSourceItem';

const mockTypeNames = {
  1: 'SQL Database',
  2: 'NoSQL Database',
  3: 'REST API',
  4: 'GraphQL API',
  5: 'File Storage',
  6: 'Message Queue',
  7: 'Search Engine',
  8: 'Cache',
  9: 'Blockchain',
  10: 'IoT Device'
};

const DataSourceList = ({ dataSources, onOpenModal, onDelete, onEdit }) => {
  if (!dataSources || dataSources.length === 0) {
    return <div className="text-gray-400">No data sources available.</div>;
  }

  if (!Array.isArray(dataSources)) {
    console.error('dataSources is not an array:', dataSources);
    return <div className="text-gray-400">Error: Invalid data sources format.</div>;
  }

  const groupedDataSources = dataSources.reduce((acc, dataSource) => {
    const typeName = mockTypeNames[dataSource.type_id] || 'Other';
    if (!acc[typeName]) {
      acc[typeName] = [];
    }
    acc[typeName].push(dataSource);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.entries(groupedDataSources).map(([typeName, sources]) => (
        <div key={typeName} className="space-y-6">
          <h3 className="text-lg font-semibold mb-6 text-purple-300">{typeName}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((dataSource) => (
              <DataSourceItem 
                key={dataSource.id} 
                dataSource={dataSource} 
                onOpenModal={onOpenModal}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSourceList;